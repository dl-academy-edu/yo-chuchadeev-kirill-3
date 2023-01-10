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
			for(partParam of param) {
				if(partParam === input.value) input.checked = true;
			}
		}
	}

	updateInput(filterForm.color, 'color');
	updateInput(filterForm.views, 'views');
	updateInput(filterForm.comments, 'comments');
	updateInput(filterForm.show, 'show');
	updateInput(filterForm.sort, 'sort');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const url = new URL(location.pathname, location.origin);
	filterForm.addEventListener('submit', (e) => {
		e.preventDefault();

		url.searchParams.delete('color');
		url.searchParams.delete('views');
		url.searchParams.delete('comments');
		url.searchParams.delete('show');
		url.searchParams.delete('sort');

		const addChekedinput = (nameGroupInput, typeParam) => {
			for(checkbox of nameGroupInput) {
				if(checkbox.cheked) {
					url.searchParams.append(typeParam, checkbox.value);
				}
			}
		}

		addChekedinput(e.target.color, 'color');
		addChekedinput(e.target.views, 'views');
		addChekedinput(e.target.comments, 'comments');
		addChekedinput(e.target.show, 'show');
		addChekedinput(e.target.sort, 'sort');

		history.replaceState(null, '', url);
	})
}




// Получение блогов
// доп материал 9 лекции

// const LIMIT = 5;


// (function() {
// 	const filterForm = document.forms.blog__filter__form;

// 	filterForm.addEventListener('submit', (e) => {
// 		e.preventDefault();

// 		let data = {
// 			page: 0,
// 		};

// 		data.name = filterForm.elements.name.value;

// 		data.tags = [...form.elements.tags]
// 		.filter(checkbox => checkbox.checked)
// 		.map(checkbox => checkbox.value);

// 		data.sortBy = ([...filterForm.elements.sortBy]
// 		.find(radio => radio.checked) || {value: null}).value;
// 		getData(data);
// 		setSearchParams(data);
// 	})

// 	let xhr = new XMLHttpRequest();
// 	xhr.open('GET', BASE_SERVER_PATH + '/api/tags');
// 	xhr.send();
// 	showLoader();
// 	xhr.onload = () => {
// 		const tags = JSON.parse(xhr.response).data;
// 		const tagsBox = document.querySelector('.#');
// 		tags.forEach(tag => {
// 			const tagHTML = createTag(tag);
// 			tagsBox.insertAdjacentHTML('beforeend', tagHTML);
// 		})
// 		const params = getParamsFromLocation();
// 		setDataToFilter(params);
// 		getData(params);
// 		hideLoader();
// 	}
// })();

// function getParamsFromLocation() {
// 	let searchParams = new URLSearchParams(location.search);
// 	return {
// 		name: searchParams.get('name') || '',
// 		tags: searchParams.getAll('tags'),
// 		sortBy: searchParams.get('sortBy'),
// 		page: +searchParams.get('page') || 0;
// 	};
// }

// function setSearchParams(data) {
// 	let searchParams = new URLSearchParams();
// 	searchParams.set('name', data.name);
// 	data.tags.forEach(tag => {
// 		searchParams.append('tags', tag);
// 	});
// 	if(data.page) {
// 		searchParams.set('page', data.page);
// 	} else {
// 		searchParams.set('page', 0);
// 	}
// 	if(data.sortBy) {
// 		searchParams.set('sortBy', data.sortBy);
// 	}
// 	history.replaceState(null, document.title, '?' + searchParams.toString());
// }

// function getData(params) {
// 	const result = document.querySelector('.result_js');
// 	let xhr = new XMLHttpRequest();
// 	let searchParams = new URLSearchParams();
// 	searchParams.set('v', '1.0.0');

// 	if(params.tags && Array.isArray(params.tags) && params.tags.length) {
// 		searchParams.set('tags', JSON.stringify(params.tags));
// 	}

// 	let filter = {};

// 	if(params.name) {
// 		filter.title = params.name;
// 	}

// 	searchParams.set('filter', JSON.stringify(filter));

// 	searchParams.set('limit', LIMIT);

// 	if(+params.page) {
// 		searchParams.set('offset', (+params.page) * LIMIT);
// 	}

// 	if(params.sortBy) {
// 		searchParams.set('sort', JSON.stringify([params.sortBy, 'DESC']));
// 	}

// 	xhr.open('GET', BASE_SERVER_PATH + '/api/posts?' + searchParams.toString());
// 	xhr.send();
// 	showLoader();
// 	result.innerHTML = '';
// 	const links = document.querySelector('.pages');
// 	links.innerHTML = '';
// 	xhr.onload = () => {
// 		const response = JSON.parse(xhr.response);
// 		let dataPosts = '';
// 		response.data.forEach(post => {
// 			dataPosts += cardCreate({
// 				title: post.title,
// 				text: post.text,
// 				src: post.photo.desktopPhotoUrl,
// 				tags: post.tags,
// 			})
// 		})
// 		result.innerHTML = dataPosts;
// 		const pageCount = Math.ceil(response.count / LIMIT);
// 		for(let i = 0; i < pageCount; i++) {
// 			const link = linkElementCreate(i);
// 			links.insertAdjacentElement('beforeend', link);
// 			links.insertAdjacentHTML('beforeend', '<br>');
// 		}
// 		hideLoader();
// 	}
// }

// function linkElementCreate(page) {
// 	const link = document.querySelector('a');
// 	link.href = '?page=' + page;
// 	link.innerText = 'страница №' + (page + 1);
// 	link.classList.add('link');

// 	let params = getParamsFromLocation();
// 	if(page === +params.page) {
// 		link.classList.add('active');
// 	}

// 	link.addEventListener('click', (e) => {
// 		e.preventDefault();
// 		const links = document.querySelectorAll('link_js');
// 		let searchParams = new URLSearchParams(location.search);
// 		let params = getParamsFromLocation();
// 		links[params.page].classList.remove('active');
// 		searchParams.set('page', page);
// 		links[page].classList.add('active');
// 		history.replaceState(null, document.title, '?' + searchParams.toString());
// 		getData(getParamsFromLocation());
// 	});
// 	return link;
// }

// function cardCreate({title, text, src, tags}) {
// 	return `
// 	<div class="col-4">
// 		<img src="${BASE_SERVER_PATH}${src}" alt="${title}">
// 		<p>${text}</p>
// 	</div>`
// }

// function setDataToFilter (data) {
// 	const filterForm = document.forms.blog__filter__form;
// 	filterForm.elements.name.value = data.name;
// 	filterForm.elements.tags.forEach(checkbox => {
// 		checkbox.checked = data.tags.includes(checkbox.value);
// 	});
// 	filterForm.elements.sortBy.forEach(radio => {
// 		radio.checked = data.sortBy === radio.value;
// 	});
// }

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