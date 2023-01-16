const body = document.querySelector('#body');
const popup = document.querySelector('.popup');
const isLogin = localStorage.getItem('token');
const loader = document.querySelector('.loader');

const loginForm = document.forms.login__form;
const email = loginForm.elements.email;
const password = loginForm.elements.password;
// const error = document.querySelector('.popup__error__text');
const btnLogOut = document.querySelector('.btn__logout_js');
const btnSignIn = document.querySelector('.btn__signin_js');
const popupLogin = document.querySelector('.popup__login');
const btnLoginClose = document.querySelector('.login__close_js');

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


//POPUP LOGIN ON/OFF
(function initLogin() {
	const isLogin = localStorage.getItem('token');

	if(isLogin) rerenderLinks();

	const login = (e) => {
		e.preventDefault();
		let data = {};
		data.email = loginForm.email.value;
		data.password = loginForm.password.value;

		// validation

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
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('userId', res.data.userId);
			rerenderLinks();
			interactionModal(popupLogin);
		})
		.catch(err => {
			if(err._message) {
				// alert(err._message);
			}
			// clearErrors(loginForm);
			errorFormHandler(err.errors, loginForm);
		})
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

btnLogOut.addEventListener('click', function() {
	localStorage.removeItem('token');
	rerenderLinks();
	location.pathname = '/';
});


// POPUP REGISTRATION ON/OFF
btnRegister.addEventListener('click', function() {
    popup.classList.toggle("close");
    popupRegister.classList.toggle("close");
	body.classList.toggle("scroll_block");
})

btnRegisterClose.addEventListener('click', function() {
	popup.classList.toggle("close");
	popupRegister.classList.toggle("close");
	document.forms[1].reset();
	body.classList.toggle("scroll_block");
})


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