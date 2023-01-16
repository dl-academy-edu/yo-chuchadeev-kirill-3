const BASE_SERVER_PATH = 'https://academy.directlinedev.com';


// CREATE ERRORS
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


// CREATE TRUTHS
const truthCreator = (message) => {
	let messageTruthDiv = document.createElement('div');
	messageTruthDiv.classList.add('popup__truth__text'); 
	messageTruthDiv.innerText = message;
	return messageTruthDiv;
}

const setTruthText = (input, truthMessage) => {
	const truth = truthCreator(truthMessage);
	input.classList.add('popup__truth__input'); 
	input.insertAdjacentElement('afterend', truth);
	input.addEventListener('input', () => {
		truth.remove();
		input.classList.remove('popup__truth__input'); 
	})
}


// CLEAR ERRORS AND TRUTHS
function clearErrors(element) {
	const messageError = element.querySelectorAll('.popup__error__text'); // .invalid-feedback-js
	const inputError = element.querySelectorAll('.popup__error__input'); // .is-invalid
	messageError.forEach(message => message.remove());
	inputError.forEach(invalid => invalid.classList.remove('popup__error__input')); // .is-invalid
}

function clearTruths(element) {
	const messageTruth = element.querySelectorAll('.popup__truth__text'); // .invalid-feedback-js
	const inputTruth = element.querySelectorAll('.popup__truth__input'); // .is-invalid
	messageTruth.forEach(message => message.remove());
	inputTruth.forEach(invalid => invalid.classList.remove('popup__truth__input')); // .is-invalid
}


// OPEN / CLOSE POPUP
function interactionModal(modal) {
	popup.classList.toggle("close");
	modal.classList.toggle("close");
	body.classList.toggle("scroll_block");
}


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
		let truths = {};

		clearErrors(loginForm);
		clearTruths(loginForm);

		if(!isEmailValid(data.email)) {
			errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
		} else {
			truths.email = 'Email is correct';
		}
		
		if(data.password.length < 6) {
			errors.password = 'Please increase your password';
		} else {
			truths.password = 'Password is correct';
		}


		if(Object.keys(truths).length) {
			Object.keys(truths).forEach((key) => {
				const messageTrurh = truths[key];
				const input = loginForm.elements[key];
				setTruthText(input, messageTrurh);
			})
		}	
		if(Object.keys(errors).length) {
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
		const input = form.elements[key];
		setErrorText(input, messageError);
		})
		return;
	}
}

function sendRequest ({url, method = 'GET', headers, body = null}) {
	return fetch(BASE_SERVER_PATH + url + '?v=0.0.1', {
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