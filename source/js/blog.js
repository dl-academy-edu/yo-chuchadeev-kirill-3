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

////////////////////////////////////////////////////////////

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

// (function() {
// 	filterForm.addEventListener('submit', (e) => {
// 		e.preventDefault();

// 		let data = {};

// 		data.name = filterForm.elements.name.value;

// 		data.sortBy = ([...filterForm.elements.sortBy]
// 		.find(radio => radio.checked) || {value: null}).value;
// 		console.log(data);
// 	})
// })();












// if(location.search) {
// 	let params = {};

// 	const arrayStringParams = location.search.substring(1).split('&');

// 	for(let stringParam of arrayStringParams) {
// 		let param = stringParam.split('=');
// 		let nameParam = param[0];
// 		let valueParam = param[1];

// 		if(nameParam in params) {
// 			params[nameParam].push(valueParam);
// 		} else {
// 			params[nameParam] = [valueParam];
// 		}
// 	}

// 	const filterForm = document.forms.blog__filter__form;

// 	const updateInput = (gInputs, typeParam) => {
// 		for(let input of gInputs) {
// 			const param = params[typeParam];
// 			for(partParam of param) {
// 				if(partParam === input.value) input.cheked = true;
// 			}
// 		}
// 	}
// }

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


