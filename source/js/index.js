const body = document.querySelector('#body');
const popup = document.querySelector('.popup');
const isLogin = localStorage.getItem('token');
const loader = document.querySelector('.loader');

const loginForm = document.forms.login__form;
// const email = loginForm.elements.email;
// const password = loginForm.elements.password;
const btnLogOut = document.querySelector('.btn__logout_js');
const btnSignIn = document.querySelector('.btn__signin_js');
const popupLogin = document.querySelector('.popup__login');
const btnLoginClose = document.querySelector('.login__close_js');


const registerForm = document.forms.register__form;
const btnRegister = document.querySelector('.btn__register_js');
const popupRegister = document.querySelector('.popup__register');
const btnRegisterClose = document.querySelector('.register__close_js');

const btnSendMessage = document.querySelector('.btn__message_js');
const popupMessage = document.querySelector('.popup__message');
const btnMessageClose = document.querySelector('.message__close_js');


//POPUP CHECKBOX
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

const checkMessage = popup.querySelector('.popup__message__form__checkbox');
const submitMessage = popup.querySelector('.btn_message_js');
submitMessage.setAttribute('disabled', true);

checkMessage.oninput = function() {
    if (checkMessage.checked) {
        submitMessage.removeAttribute('disabled');
    }else{
        submitMessage.setAttribute('disabled', true);
    }
};


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
		interactionModal(popupLogin);
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


// ПОПАП РЕГИСТРАЦИИ И ВАЛИДАЦИЯ
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
		interactionModal(popupRegister);
	})

	btnRegisterClose.addEventListener('click', function() {
		interactionModal(popupRegister);
		registerForm.reset();
		clearErrors(registerForm);
		clearTruths(registerForm);
	})

	registerForm.addEventListener('submit', register);
})();

// // POPUP REGISTRATION ON/OFF
// btnRegister.addEventListener('click', function() {
//     popup.classList.toggle("close");
//     popupRegister.classList.toggle("close");
// 	body.classList.toggle("scroll_block");
// })

// btnRegisterClose.addEventListener('click', function() {
// 	popup.classList.toggle("close");
// 	popupRegister.classList.toggle("close");
// 	document.forms[1].reset();
// 	body.classList.toggle("scroll_block");
// })



//POPUP MESSAGE ON/OFF
btnSendMessage.addEventListener('click', function() {
	interactionModal(popupMessage);
})

btnMessageClose.addEventListener('click', function() {
	interactionModal(popupMessage);
	document.forms[2].reset();
})


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


// LOADER ON/OFF
const showLoader = () => {
	loader.classList.remove('close');
	popup.classList.remove('close');
}

const hideLoader = () => {
	loader.classList.add('close');
	popup.classList.add('close');
}