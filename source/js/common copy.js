const BASE_SERVER_PATH = 'https://academy.directlinedev.com';


//__________________________________________________________________________________________________________________________________//
// CREATE ERRORS FOR VALIDATION

const errorCreator = (message) => {
	let messageErrorDiv = document.createElement('div');
	messageErrorDiv.classList.add('popup__error__text');
	messageErrorDiv.innerText = message;
	return messageErrorDiv;
}

const setErrorText = (input, errorMessage) => {
	const error = errorCreator(errorMessage);
	input.classList.add('popup__error__input');
	input.insertAdjacentElement('afterend', error);
	input.addEventListener('input', () => {
		error.remove();
		input.classList.remove('popup__error__input');
	})
}

//__________________________________________________________________________________________________________________________________//
//LOGIN FORM VALIDATION

const isEmailValid = (email) => {
	return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)
}

(function() {
	const loginForm = document.forms.login__form;
	const email = loginForm.elements.email;
	const password = loginForm.elements.password;
	
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();
		
		const data = {
			email: email.value,
			password: password.value,
		}

		let errors = {};

		if(!isEmailValid(data.email)) {
			errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
			console.log(errors.email);
			} else {
				email.style.border = `2.5px solid #03BC3C`;
			}
		
		if(data.password.length <= 6) {
			errors.password = 'Please increase your password';
			console.log(errors.password);
			} else {
				password.style.border = `2.5px solid #03BC3C`;
			}

		if(!Object.keys(errors).length) {
			console.log('all good');

		} else {
			console.log('error');
			Object.keys(errors).forEach((key) => {
				const messageError = errors[key];
				const input = loginForm.elements[key];
				setErrorText(input, messageError);
			})
			return;
		}
	})
})();

//__________________________________________________________________________________________________________________________________//
// AUTENTIFICATION



function sendRequest ({url, method = 'GET', headers, body = null}) {
	return fetch(BASE_SERVER_PATH + url + '?v=0.0.1.', {
		method,
		headers,
		body,
	})
}


//__________________________________________________________________________________________________________________________________//
// REGISTER FORM VALIDATION
// (function() {
// 	const registerForm = document.forms.register;

// 	registerForm.addEventListener('submit', (e) => {
// 		e.preventDefault();

// 		const email = registerForm.elements.email;
// 		const name = registerForm.elements.name;
// 		const surname = registerForm.elements.surname;
// 		const password = registerForm.elements.password;
// 		const location = registerForm.elements.location;
// 		const age = registerForm.elements.age;
// 		const accept = [...registerForm.elements.accept].find(item => item.checked);
		
// 		let errors = {};

// 		console.log(email, name, surname, password, location, age)
// 		if(!accept.value) {
// 			errors.accept = 'нужно подтвердить';
// 		}

// 		if(!isEmailValid(email.value)) {
// 			errors.email = 'почта не правльна';
// 		}
// 		if(password.value.length <= 6) {
// 			errors.password = 'pw cut';
// 		}
// 		if(!name.value.length) {
// 			errors.name = 'укажите имя';
// 		}
// 		if(Object.keys(errors).length) {
// 			'warning'
// 			return;
// 		}

// 		const data = {
// 			email: email.value,
// 			password: password.value,
// 			name: name.value,
// 			accept: accept.value,
// 		}

// 		'all good'
// 	})
// })();



// LOGIN AUTENTIFICATION

// (function initLogin() {

// 	const login = (e) => {
// 		e.preventDefault();
// 		let data = {};
// 		data.email = loginForm.email.value;
// 		data.password = loginForm.password.value;
// 		//validation
// 	}

// 	loginForm.addEventListener('submit', login);
// })();