// Работа с линком, добавление и удаление взависимости от фильтров
if(location.search) {
	const params = {};

	const arrayStringParams = location.search.substring(1).split('&');

	for(let stringParam of arrayStringParams) {
		let param = stringParam.split('=');
		let nameParam = param[0];
		let valueParam = param[1];

		if(nameParam in params) {
			params[nameParam].push(valueParam);
		} else {
			params[nameParam] = [valueParam];
		}
	}

	const filterForm = document.forms.blog__filter__form;

	const updateInput = (gInputs, typeParam) => {
		for(let input of gInputs) {
			const param = params[typeParam];
			if (!param) return;
			for(partParam of param) {
				if(partParam === input.value) input.checked = true;
			}
		}
	}

	updateInput(filterForm.tags, 'tags');
	updateInput(filterForm.views, 'views');
	updateInput(filterForm.comments, 'comments');
	updateInput(filterForm.limit, 'limit');
	updateInput(filterForm.sort, 'sort');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const url = new URL(location.pathname, location.origin);
	filterForm.addEventListener('submit', (e) => {
		e.preventDefault();

		url.searchParams.delete('tags');
		url.searchParams.delete('views');
		url.searchParams.delete('comments');
		url.searchParams.delete('limit');
		url.searchParams.delete('sort');

		const addChekedinput = (nameGroupInput, typeParam) => {
			for(checkbox of nameGroupInput) {
				if(checkbox.cheked) {
					url.searchParams.append(typeParam, checkbox.value);
				}
			}
		}

		addChekedinput(e.target.tags, 'tags');
		addChekedinput(e.target.views, 'views');
		addChekedinput(e.target.comments, 'comments');
		addChekedinput(e.target.limit, 'limit');
		addChekedinput(e.target.sort, 'sort');

		history.replaceState(null, '', url);
	})
}




// Получение блогов
// доп материал 9 лекции

const LIMIT = 5;

(function() {
	const filterForm = document.forms.blog__filter__form;

	filterForm.addEventListener('submit', (e) => {
		e.preventDefault();

		let data = {
			page: 0,
		};

		data.tags = ([...filterForm.elements.tags]
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.value));
		data.comments = ([...filterForm.elements.comments]
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.value))
		data.views = ([...filterForm.elements.views]
			.find(radio => radio.checked) || {value: null}).value;
		// data.limit = ([filterForm.elements.limit]
		// 	.find(radio => radio.checked) || {value: null}).value;
		data.limit = +filterForm.elements.limit.value || 5;
		// data.sort = filterForm.elements.color.sort;
		data.sort = ([...filterForm.elements.sort]
			.find(radio => radio.checked) || {value: null}).value;
		data.search = filterForm.elements.search.value === "" ? null : filterForm.elements.search.value;
		getData(data);
		setSearchParams(data);
	})
	

	// ПОЛУЧАЕМ ТЕГИ
	// let xhr = new XMLHttpRequest();
	// xhr.open('GET', BASE_SERVER_PATH + '/api/tags');
	// xhr.send();
	// // showLoader();
	// xhr.onload = () => {
	// 	const tags = JSON.parse(xhr.response).data;
	// 	const tagsBox = document.querySelector('.#');
	// 	tags.forEach(tag => {
	// 		const tagHTML = createTag(tag);
	// 		tagsBox.insertAdjacentHTML('beforeend', tagHTML);
	// 	})
	const params = getParamsFromLocation();
	setDataToFilter(params);
	getData(params);
	// 	// hideLoader();
	// }
})();


// ПОЛУЧАЕМ ДАННЫЕ ИЗ LOCATION.SEARCH (ПОИСКА)
function getParamsFromLocation() {
	let searchParams = new URLSearchParams(location.search);
	return {
		tags: searchParams.getAll('tags'),
		views: searchParams.get('views'),
		comments: searchParams.getAll('comments'),
		limit: searchParams.get('limit'),
		sort: searchParams.get('sort'),
		search: searchParams.get('search') || null,
		page: +searchParams.get('page') || 0,
	};
}


function setSearchParams(data) {
	let searchParams = new URLSearchParams();

	data.tags.forEach(tag => {
		searchParams.append('tags', tag);
	});

	if(data.page) {
		searchParams.set('page', data.page);
	} else {
		searchParams.set('page', 0);
	}

	if(data.views) {
		searchParams.set('views', data.views);
	}

	data.comments.forEach(comment => {
		searchParams.append('comments', comment);
	});

	if(data.limit) {
		searchParams.set('limit', data.limit);
	}

	if(data.sort) {
		searchParams.set('sort', data.sort);
	}

	if(data.search) {
		searchParams.set('search', data.search);
	}

	history.replaceState(null, document.title, '?' + searchParams.toString());
}


// ПОЛУЧЕНИЕ ПОСТОВ
function getData(params) {
	const result = document.querySelector('.blog__posts');
	let xhr = new XMLHttpRequest();
	let searchParams = new URLSearchParams();

	let filter = {};
	let limit = params.limit ? params.limit : LIMIT;

	if(params.tags && Array.isArray(params.tags) && params.tags.length) {
		searchParams.set('tags', JSON.stringify(params.tags));
	}

	if(params.views) {
		filter.views = {};
		filter.views.$between = [params.views.split('-')[0], params.views.split('-')[1]];
	}
	
	if(params.comments.length != 0) {
		if(params.comments[0] === "0") {
			filter.commentsCount = {};
			filter.commentsCount.$between = [0, 0];
		} else {
			filter.commentsCount = {};
			filter.commentsCount.$between = [params.comments[0].split('-')[0], params.comments[0].split('-')[1]] || [params.comments];
		}
	}

	// if(limit) {
	// 	searchParams.set('limit', limit);
	// }

	if(params.sort) {
		searchParams.set('sort', JSON.stringify([params.sort, 'DESC']));
	}

	if(params.search) {
		// filter.title = params.search;
		// filter.search.length != 0 ? filter.title = params.search : "";
		filterForm.elements.search = params.search;
	}

	if(+params.page) {
		searchParams.set('offset', (+params.page) * limit);
	}

	searchParams.set('v', '1.0.0');
	searchParams.set('filter', JSON.stringify(filter));
	searchParams.set('limit', limit);

	xhr.open('GET', BASE_SERVER_PATH + '/api/posts?' + searchParams.toString());
	xhr.send();
	showLoader();
	result.innerHTML = '';
	const links = document.querySelector('.blog__pages');
	links.innerHTML = '';
	xhr.onload = () => {
		const response = JSON.parse(xhr.response);
		let dataPosts = '';
		response.data.forEach(post => {
			dateCorrecting(post.date);
			dataPosts += cardCreate({
				title: post.title,
				text: post.text,
				src: post.photo.desktopPhotoUrl,
				tags: post.tags,
				date: post.date,
				comments: post.commentsCount,
				views: post.views,
			});
		})
		result.innerHTML = dataPosts;
		const pageCount = Math.ceil(response.count / limit);
		for(let i = 0; i < pageCount; i++) {
			const link = linkElementCreate(i);
			links.insertAdjacentElement('beforeend', link);
			links.insertAdjacentHTML('beforeend', '');
		}
		hideLoader();
	}
}


// ПАГИНАЦИЯ
function linkElementCreate(page) {
	const link = document.createElement('a');
	link.href = '?page=' + page;
	link.innerText = (page + 1);
	link.classList.add('blog__pages__link');
	link.classList.add('pages__link_js');

	let params = getParamsFromLocation();
	if(page === +params.page) {
		link.classList.add('blog__pages__active');
	}

	link.addEventListener('click', (e) => {
		e.preventDefault();
		const links = document.querySelectorAll('.pages__link_js');
		let searchParams = new URLSearchParams(location.search);
		let params = getParamsFromLocation();
		links[params.page].classList.remove('.blog__pages__active');
		searchParams.set('page', page);
		links[page].classList.add('blog__pages__active');
		history.replaceState(null, document.title, '?' + searchParams.toString());
		getData(getParamsFromLocation());
	});
	return link;
}


// СОЗДАЕМ КАРТОЧКУ ДЛЯ ПОЛУЧЕНЫХ ДАННЫХ
function cardCreate({title, text, src, tags, date, comments, views}) {
	return `
	<hr class="blog__line">
	<div class="blog__posts__card">
		<picture class="card__picture">
			<img src="${BASE_SERVER_PATH}${src}" alt="${title}">
		</picture>
		<section class="card__info">
			<div class="card__tags">${tags.map(tag => `
				<span class="card__tag" style="background: ${tag.color}" alt="${tag.name}"></span>`).join(' ')}
			</div>
			<div class="card__data">
				<p class="card__data__date">${date}</p>
				<p class="card__data__views">${views} views</p>
				<p class="card__data__comments">${comments} comments</p>
			</div>
			<h4 class="card__title">${title}</h4>
			<p class="card__text">${text}</p>
			<a href="#" class="card__link">Go to this post</a>
		</section>
	</div>
	`
}


// ВЫДЕЛЕНИЕ ВЫБРАНЫХ ИНПУТОВ
function setDataToFilter (data) {
	const filterForm = document.forms.blog__filter__form;

	filterForm.elements.tags.forEach(checkbox => {
		checkbox.checked = data.tags.includes(checkbox.value);
	});
	filterForm.elements.views.forEach(radio => {
		radio.checked = data.views === radio.value;
	});
	filterForm.elements.comments.forEach(checkbox => {
		checkbox.checked = data.comments.includes(checkbox.value);
	});
	filterForm.elements.limit.forEach(radio => {
		radio.checked = data.limit === radio.value;
	});
	filterForm.elements.sort.forEach(radio => {
		radio.checked = data.sort === radio.value;
	});
	filterForm.elements.search = data.search;
}

// РЕДАКТИРОВАНИЕ ДАТЫ

function dateCorrecting (serverDate) {
	let date = new Date(serverDate);

	let dayDate = date.getDate();
	let monthDate = date.getMonth() + 1;
	let yearDate = date.getFullYear();

	if(dayDate < 10) {
		dayDate = '0' + dayDate;
	}

	if (monthDate < 10 ) {
		monthDate = '0' + monthDate;
	}

	const finalDate = `${dayDate}.${monthDate}.${yearDate}`;
	return finalDate;
}






// ДЛЯ СОЗДАНИЯ ТЕГОВ
// function createTag({id, name, color}) {
// 	return `
// 	<div class="1">
		
// 	</div>`
// }



////////////////////////////////////////////////////////////////////////
// filterForm.addEventListner('submit', (e) => {
// 	e.preventDefault();

// 	let arrayCheckedInput = [];

// 	const addChekedinput = (nameGroupInput, typeParam) => {
// 		for(checkbox of nameGroupInput) {
// 			if(checkbox.cheked) {
// 				arrayCheckedInput.push(`${typeParam}=${checkbox.value}`)
// 			}
// 		}
// 	}

// 	let stringCheckedInput = '';

// 	for([index, activeInput] of arrayCheckedInput.entries()) {
// 		stringCheckedInput += activeInput;

// 		if(index != arrayCheckedInput.length - 1) {
// 			stringCheckedInput += '&';
// 		}
// 	}

// 	const baseUrl = `${location.origin}${location.pathname}`;
// 	const newUrl = baseUrl + `?${stringCheckedInput}`;
	
// 	location = newUrl;
// })