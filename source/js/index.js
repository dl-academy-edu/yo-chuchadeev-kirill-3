const body = document.querySelector('#body');
const popup = document.querySelector('.popup');
const isLogin = localStorage.getItem('token');
const loader = document.querySelector('.loader');

// const email = loginForm.elements.email;
// const password = loginForm.elements.password;
const loginForm = document.forms.login__form;
const btnSignIn = document.querySelector('.btn__signin_js');
const popupLogin = document.querySelector('.popup__login');
const btnLoginClose = document.querySelector('.login__close_js');

const btnLogOut = document.querySelector('.btn__logout_js');

const registerForm = document.forms.register__form;
const btnRegister = document.querySelector('.btn__register_js');
const popupRegister = document.querySelector('.popup__register');
const btnRegisterClose = document.querySelector('.register__close_js');

const messageForm = document.forms.message__form;
const openMessage = document.querySelector('.open__message_js');
const popupMessage = document.querySelector('.popup__message');
const closeMessage = document.querySelector('.close__message_js');



// ФОРМА ЛОГИНА И ВАЛИДАЦИЯ
(function initLogin() {
	const isLogin = localStorage.getItem('token');

	if(isLogin) rerenderLinks();

	const login = (e) => {
		e.preventDefault();

		let data = {};
		let errors = {};
		let truths = {};

		data.email = loginForm.email.value;
		data.password = loginForm.password.value;

		clearErrors(loginForm);
		clearTruths(loginForm);

		sendRequest({
			method: 'POST',
			url: '/api/users/login',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			},
		})
		.then(res => res.json())
		.then(res => {
			// if(res._message) {
			// 	let userError = res._message;
			// }
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('userId', res.data.userId);
			rerenderLinks();
			interactionModal(popupLogin);
			// return res.json();
		})
		.catch(err => {
			if(err._message) {
				alert(err._message);
			}
			clearErrors(loginForm);
			// errorFormHandler(err.errors, loginForm);
		})

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
	}

	btnSignIn.addEventListener('click', function() {
		closeMenu();
		interactionModal(popupLogin);
		closeESC(popupLogin);
		
	})

	btnLoginClose.addEventListener('click', function() {
		interactionModal(popupLogin);
		loginForm.reset();
		clearErrors(loginForm);
		clearTruths(loginForm);
	})

	loginForm.addEventListener('submit', login);
})();


// КНОПКА ВЫХОДА ИЗ ПРОФИЛЯ
btnLogOut.addEventListener('click', function() {
	localStorage.removeItem('token');
	rerenderLinks();
	location.pathname = '/';
});


// ФОРМА РЕГИСТРАЦИИ И ВАЛИДАЦИЯ
(function registration() {
	const isLogin = localStorage.getItem('token');

	if(isLogin) rerenderLinks();

	const register = (e) => {
		e.preventDefault();

		let data = {};
		let errors = {};
		let truths = {};

		data.email = registerForm.email.value;
		data.name = registerForm.name.value;
		data.surname = registerForm.surname.value;
		data.password = registerForm.password.value;
		data.repeatPassword = registerForm.repeatPassword.value;
		data.location = registerForm.location.value;
		data.age = +registerForm.age.value;

		clearErrors(registerForm);
		clearTruths(registerForm);

		sendRequest({
			method: 'POST',
			url: '/api/users',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			},
		})
		.then(res => res.json())
		.then(res => {
			// if(res._message) {
			// 	let userError = res._message;
			// }
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('userId', res.data.userId);
			rerenderLinks();
			interactionModal(registerForm);
			// return res.json();
		})
		.catch(err => {
			if(err._message) {
				alert(err._message);
			}
			// clearErrors(registerForm);
			// errorFormHandler(err.errors, loginForm);
		})

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

		if(!data.repeatPassword) {
			errors.repeatPassword = 'Enter your password again';
		} else {
			if(data.repeatPassword === data.password) {
				truths.repeatPassword = 'Passwords match';
			} else { 
				errors.repeatPassword = 'Passwords do not match';
			}
		}
		
		if(data.name.length === 0) {
			errors.name = 'Укажите имя';
		} else if(data.name.length < 3) {
			errors.name = 'Придумай новое имя :)';
		} else {
			truths.name = 'Good name';
		}

		if(!data.surname.length) {
			errors.surname = 'Укажите фамилию';
		} else if(data.surname.length < 3) {
			errors.surname = 'Придумайте новую фамилию :)';
		} else {
			truths.surname = 'Good surname';
		}
		
		if(!data.location.length) {
			errors.location = 'Enter location';
		} else if(data.location.length <= 3) {
			errors.location = 'Uncorrect location';
		} else {
			truths.location = 'All good';
		}
		
		if(!data.age) {
			errors.age = 'Enter age';
		} else if(data.age < 18) {
			errors.age = 'Wait until you grow up';
		} else {
			truths.age = 'All good';
		}
		
		if(Object.keys(truths).length) {
			Object.keys(truths).forEach((key) => {
				const messageTrurh = truths[key];
				const input = registerForm.elements[key];
				setTruthText(input, messageTrurh);
			})
		}	
		if(Object.keys(errors).length) {
			Object.keys(errors).forEach((key) => {
				const messageError = errors[key];
				const input = registerForm.elements[key];
				setErrorText(input, messageError);
			})
			return;
		}
	}

	btnRegister.addEventListener('click', function() {
		closeMenu();
		interactionModal(popupRegister);
		closeESC(popupRegister);

		const checkRegister = popup.querySelector('.popup__register__form__checkbox');
		const submitRegister = popup.querySelector('.btn_signup_js');
		submitRegister.setAttribute('disabled', true);

		checkRegister.oninput = function() {
			if (checkRegister.checked) {
				submitRegister.removeAttribute('disabled');
			}else{
				submitRegister.setAttribute('disabled', true);
			}
		};
	})

	btnRegisterClose.addEventListener('click', function() {
		interactionModal(popupRegister);
		registerForm.reset();
		clearErrors(registerForm);
		clearTruths(registerForm);
	})

	registerForm.addEventListener('submit', register);
})();


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
};


// ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ О СТАТУСАХ ИЗМЕНЕНИЙ ДАННЫХ ПРОФИЛЯ
function popupStatusOpen(popupStatus) {
	// popupStatus.classList.add('open');
	// body.classList.add('scroll_block');
	// popup.classList.remove('close');
	popupStatus.classList.remove('close');


	buttonClose = popupStatus.querySelector('button');
	buttonClose.addEventListener('click', () => {
		popupStatusClose(popupStatus);
	})
	setTimeout(popupStatusClose(popupStatus), 2000); // не работает
};

function popupStatusClose(popupStatus) {
	popupStatus.classList.add('close');
	popup.classList.add('close');
	body.classList.remove('scroll_block');
	// popupStatus.classList.remove('open');
	// popup.classList.add('close');
};


// ФОРМА ОТПРАВКИ СООБЩЕНИЯ
(function sendMessage() {
	const popupSuccess = document.querySelector('.popup__status__success');
	const popupError = document.querySelector('.popup__status__error');

	const message = (e) => {
		e.preventDefault();

		let data = {};
		let errors = {};
		let truths = {};

		data.name = messageForm.name.value;
		data.email = messageForm.email.value;
		data.theme = messageForm.theme.value;
		data.phone = messageForm.phone.value;
		data.message = messageForm.message.value;

		let newData = {
			to: messageForm.email.value,
			body: JSON.stringify(data),
		};

		clearErrors(messageForm);
		clearTruths(messageForm);

		if(data.name.length === 0) {
			errors.name = 'Укажите имя';
		} else if(data.name.length < 3) {
			errors.name = 'Придумай новое имя :)';
		} else {
			truths.name = 'Good name';
		}
		
		if(data.theme.length < 4) {
			errors.theme = 'Please enter a subject';
		} else {
			truths.theme = 'All good';
		}
		
		if(!isEmailValid(data.email)) {
			errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
		} else {
			truths.email = 'Email is correct';
		}

		if(!data.phone) {
			errors.phone = 'Enter phone number';
		} else if(!isNumberValid(data.phone)) {
			errors.phone = 'Phone number entered incorrectly';
		} else {
			truths.phone = 'All good';
		}

		if(!data.message.length) {
			errors.message = 'We are waiting for your message';
		} else if(data.message.length < 15) {
			errors.message = 'Add something else';
		} else {
			truths.message = 'Thank you!';
		}

		
		if(Object.keys(truths).length) {
			Object.keys(truths).forEach((key) => {
				const messageTrurh = truths[key];
				const input = messageForm.elements[key];
				setTruthText(input, messageTrurh);
			})
		}	
		if(Object.keys(errors).length) {
			Object.keys(errors).forEach((key) => {
				const messageError = errors[key];
				const input = messageForm.elements[key];
				setErrorText(input, messageError);
			})
			return;
		}

		showLoader();

		sendRequest({
			method: 'POST',
			url: '/api/emails',
			body: JSON.stringify(newData),
			headers: {
				"Content-Type": "application/json",
			}
		})
		.then(res => res.json())
		.then(res => {
			if(res.success) {
				popupStatusOpen(popupSuccess);
			} else {
				throw res;
			}
		})
		.catch(err => {
			popupStatusOpen(popupError);
			if(err._message) {
				alert(err._message);
			}
		})
		.finally(() => {
			interactionModal(popupMessage);
			messageForm.reset();
			clearErrors(messageForm);
			clearTruths(messageForm);
		})
		hideLoader();
	}
	
	openMessage.addEventListener('click', function() {
		interactionModal(popupMessage);
		closeESC(popupMessage);

		const checkMessage = popup.querySelector('.popup__message__form__checkbox');
		const submitMessage = popup.querySelector('.btn_message_js'); // кнопка отправки

		submitMessage.setAttribute('disabled', true);

		checkMessage.oninput = function() {
			if (checkMessage.checked) {
				submitMessage.removeAttribute('disabled');
			}else{
				submitMessage.setAttribute('disabled', true);
			}
		};
	})

	closeMessage.addEventListener('click', function() {
		interactionModal(popupMessage);
		messageForm.reset();
		clearErrors(messageForm);
		clearTruths(messageForm);
	})

	messageForm.addEventListener('submit', message);
})();


// ЛОАДЕР
function showLoader() {
	loader.classList.remove('close');
	popup.classList.remove('close');
};

function hideLoader() {
	loader.classList.add('close');
	popup.classList.add('close');
};


// МЕНЮ БУРГЕР
const openMenuBtn = document.querySelector('.open__menu_js');
const closeMenuBtn = document.querySelector('.close__menu_js');
const burgerMenu = document.querySelector('.header__content');

openMenuBtn.addEventListener('click', () => {
	// burgerMenu.style.display='flex';
	burgerMenu.classList.add('open');
	closeMenuBtn.classList.remove('close');
	body.classList.add('scroll_block');

	window.addEventListener('resize', () => {
		if(window.innerWidth > 602) {
			closeMenu();
		}
	});
	
	closeMenuBtn.addEventListener('click', () => {
		setTimeout(closeMenu, 500);
	});
});


function closeMenu() {
	// burgerMenu.style.display='none';
	burgerMenu.classList.remove('open');
	closeMenuBtn.classList.add('close');
	body.classList.remove('scroll_block');
};