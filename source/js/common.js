const BASE_SERVER_PATH = 'https://academy.directlinedev.com';


// СОЗДАНИЕ ОШИБОК
const errorCreator = (message) => {
	let messageErrorDiv = document.createElement('div');
	messageErrorDiv.classList.add('popup__error__text'); // .invalid-feedback
	messageErrorDiv.innerText = message;
	return messageErrorDiv;
};
const setErrorText = (input, errorMessage) => {
	const error = errorCreator(errorMessage);
	input.classList.add('popup__error__input'); // .is-invalid
	input.insertAdjacentElement('afterend', error);
	input.addEventListener('input', () => {
		error.remove();
		input.classList.remove('popup__error__input'); // .is-invalid
	});
};


// СОЗДАНИЕ КОРРЕКТОВ
const truthCreator = (message) => {
	let messageTruthDiv = document.createElement('div');
	messageTruthDiv.classList.add('popup__truth__text'); 
	messageTruthDiv.innerText = message;
	return messageTruthDiv;
};
const setTruthText = (input, truthMessage) => {
	const truth = truthCreator(truthMessage);
	input.classList.add('popup__truth__input'); 
	input.insertAdjacentElement('afterend', truth);
	input.addEventListener('input', () => {
		truth.remove();
		input.classList.remove('popup__truth__input'); 
	});
};


// ОЧИСТКА ОШИБОК И КОРРЕКТОВ
function clearErrors(element) {
	const messageError = element.querySelectorAll('.popup__error__text'); // .invalid-feedback-js
	const inputError = element.querySelectorAll('.popup__error__input'); // .is-invalid
	messageError.forEach(message => message.remove());
	inputError.forEach(invalid => invalid.classList.remove('popup__error__input')); // .is-invalid
};
function clearTruths(element) {
	const messageTruth = element.querySelectorAll('.popup__truth__text'); // .invalid-feedback-js
	const inputTruth = element.querySelectorAll('.popup__truth__input'); // .is-invalid
	messageTruth.forEach(message => message.remove());
	inputTruth.forEach(invalid => invalid.classList.remove('popup__truth__input')); // .is-invalid
};


// ПОПАПЫ ОТКРЫТИЕ И ЗАКРЫТИЕ
function interactionModal(modal) {
	popup.classList.toggle('close');
	modal.classList.toggle('close');
	body.classList.toggle('scroll_block');
};


// ЗАКРЫТИЕ ПОПАПОВ ПО ESCAPE
function closeESC(modal) {
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			popup.classList.add('close');
			modal.classList.add('close');
			body.classList.remove('scroll_block');
		}
	});
};


// ВАЛИДАЦИЯ ЕМЕИЛА
function isEmailValid(email) {
	return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
};


// ВАЛИДАЦИЯ НОМЕРА ТЕЛЕФОНА
function isNumberValid(phone) {
	return phone.match(/^\d[\d\(\)\ -]{4,14}\d$/);
};


// ?????????????????????
function errorFormHandler(errors, form) {
	if(Object.keys(errors).length) {
		Object.keys(errors).forEach((key) => {
		const messageError = errors[key];
		const input = form.elements[key];
		setErrorText(input, messageError);
		})
		return;
	}
};


// ОТПРАВКА ЗАПРОСА НА БЭК
function sendRequest ({url, method = 'GET', headers, body = null}) {
	return fetch(BASE_SERVER_PATH + url + '?v=0.0.1', {
		method,
		headers,
		body,
	})
};


// СКРОЛ СТРАНИЦЫ ВВЕРХ
const scrollUp = document.querySelector('.btn__up_js');
(function () {
	if(!scrollUp) return;

  	window.addEventListener('scroll', () => {
    	if(window.pageYOffset > 1100) {
			scrollUp.classList.remove('close');
    	} else {
			scrollUp.classList.add('close');
   		}
  	});

  	scrollUp.addEventListener('click', () => {
		setTimeout(2000);
    	window.scrollTo({
			top: 0,
			behavior: "smooth",
    	});
  	});
})();

// ПЕРЕЗАГРУЗКА СТРАНИЦЫ
function reloadPage() {
	location.reload();
};

// ПЕРЕХОД НА ГЛАВНУЮ
function goToMain() {
	location.pathname = '/';
};