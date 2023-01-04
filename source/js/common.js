const BASE_SERVER_PATH = 'https://academy.directlinedev.com';


//__________________________________________________________________________________________________________________________________//
// CREATE ERRORS AND RIGHTS FOR VALIDATION

const errorCreator = (message) => {
	let messageErrorDiv = document.createElement('div');
	messageErrorDiv.classList.add('popup__error__text'); // .invalid-feedback
	messageErrorDiv.innerText = message;
	return messageErrorDiv;
}

const setErrorText = (input, errorMessage) => {
	const error = errorCreator(errorMessage);
	input.classList.add('popup__error__input'); // .is-invalid
	input.insertAdjacentElement('afterend', error);
	input.addEventListener('input', () => {
		error.remove();
		input.classList.remove('popup__error__input'); // .is-invalid
	})
}


//__________________________________________________________________________________________________________________________________//
// CLEAR ERRORS

function clearErrors(element) {
	const messages = element.querySelectorAll('.popup__error__text'); // .invalid-feedback-js
	const invalids = element.querySelectorAll('.popup__error__input'); // .is-invalid
	messages.forEach(message => message.remove());
	invalids.forEach(invalid => invalid.classList.remove('popup__error__input')); // .is-invalid
}


//__________________________________________________________________________________________________________________________________//
// OPEN/CLOSE POPUP

function interactionModal(modal) {
	popup.classList.toggle("close");
	modal.classList.toggle("close");
	body.classList.toggle("scroll_block");
}

//__________________________________________________________________________________________________________________________________//
// RERENDERS HEADER LINKS

function rerenderLinks() {
	const isLogin = localStorage.getItem('token');
	const btnSignIn = document.querySelector('.btn__signin_js');
	const registerButton = document.querySelector('.btn__register_js');
	const toMyBlogButton = document.querySelector('.btn__blog_js');
	const toProfileButton = document.querySelector('.btn__profile_js');

	if(isLogin) {
		btnSignIn.classList.add('close');
		registerButton.classList.add('close');
		toMyBlogButton.classList.remove('close');
		toProfileButton.classList.remove('close');
		btnLogOut.classList.remove('close');
	} 
	else {
		btnSignIn.classList.remove('close');
		registerButton.classList.remove('close');
		toMyBlogButton.classList.add('close');
		toProfileButton.classList.add('close');
		btnLogOut.classList.add('close');
	}
}


//__________________________________________________________________________________________________________________________________//
// LOGIN FORM VALIDATION

const isEmailValid = (email) => {
	return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)
}

(function() {
	const loginForm = document.forms.login__form;
	let email = loginForm.elements.email;
	let password = loginForm.elements.password;

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
		
		if(data.password.length < 6) {
			errors.password = 'Please increase your password';
			console.log(errors.password);
		} else {
			password.style.border = `2.5px solid #03BC3C`;
		}

		if(document.querySelector('.popup__error__text')) {
			error.remove();
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



// ?????????????????????????????????????????
function errorFormHandler(errors, form) {
	if(Object.keys(errors).length) {
		Object.keys(errors).forEach((key) => {
		const messageError = errors[key];
		const input = loginForm.elements[key];
		setErrorText(input, messageError);
		})
		return;
	}
}

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