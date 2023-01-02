const body = document.querySelector('#body');
const popup = document.querySelector('.popup');

const btnLogOut = document.querySelector('btn__logout_js')

const btnRegister = document.querySelector('.btn__register_js');
const popupRegister = document.querySelector('.popup__register');
const btnRegisterClose = document.querySelector('.register__close_js');

const btnSendMessage = document.querySelector('.btn__message_js');
const popupMessage = document.querySelector('.popup__message');
const btnMessageClose = document.querySelector('.message__close_js');

//popup profile
const popupProfile = document.querySelector('.popup__profile');
const popupChangePassword = document.querySelector('.popup__change__password');
const openChangePassword = document.querySelector('.open_change_password_js');
const closeChangePassword = document.querySelector('.close_change_password_js');
const popupChangeData = document.querySelector('.popup__change__data');
const openChangeData = document.querySelector('.open_change_data_js');
const closeChangeData = document.querySelector('.close_change_data_js');

//__________________________________________________________________________________________________________________________________//
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
}

const checkMessage = popup.querySelector('.popup__message__form__checkbox');
const submitMessage = popup.querySelector('.btn_message_js');
submitMessage.setAttribute('disabled', true);

checkMessage.oninput = function() {
    if (checkMessage.checked) {
        submitMessage.removeAttribute('disabled');
    }else{
        submitMessage.setAttribute('disabled', true);
    }
}

//__________________________________________________________________________________________________________________________________//
//POPUP LOGIN ON/OFF

// btnSignIn.addEventListener('click', function() {
// 	popup.style.display = 'flex';
// 	popupLogin.style.display = 'flex';
// 	body.classList.add("scroll_block")
// })

// btnLoginClose.addEventListener('click', function() {
// 	popup.style.display = 'none';
// 	popupLogin.style.display = 'none';
// 	document.forms[0].reset();
// 	body.classList.remove("scroll_block");
// 	loginForm.elements.email.removeAttribute("style");
// 	loginForm.elements.password.removeAttribute("style");
// 	email.classList.remove('popup__error__input');
// 	password.classList.remove('popup__error__input');
// 	error.remove();
// })

(function initLogin() {
	const loginForm = document.forms.login__form;
	const email = loginForm.elements.email;
	const password = loginForm.elements.password;
	const error = document.querySelector('.popup__error__text');
	const btnSignIn = document.querySelector('.btn__signin_js');
	const popupLogin = document.querySelector('.popup__login');
	const btnLoginClose = document.querySelector('.login__close_js');
	
	const isLogin = localStorage.getItem('token');

	if(isLogin) rerenderLinks();

	const login = (e) => {
		e.preventDefault();
		let data = {};
		data.email = loginForm.email.value;
		data.password = loginForm.password.value;

		//validation

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
				alert(err._message);
			}
			clearErrors(loginForm);
			errorFormHandler(err.errors, loginForm);
		})
	}


	btnSignIn.addEventListener('click', function() {
		interactionModal(popupLogin);
	})();

	btnLoginClose.addEventListener('click', function() {
		interactionModal(popupLogin);
	})

	loginForm.addEventListener('submit', login);
})();


btnLogOut.addEventListener('click', function () {
	localStorage.setItem('token', res.data.token).remove();
	// rerenderLinks();
	location.pathname = '/';
});

//__________________________________________________________________________________________________________________________________//
// POPUP REGISTRATION ON/OFF

// btnRegister.addEventListener('click', function() {
//     popup.style.display = 'flex';
//     popupRegister.style.display = 'flex';
// 	body.classList.add("scroll_block");
// })

// btnRegisterClose.addEventListener('click', function() {
// 	popup.style.display = 'none';
// 	popupRegister.style.display = 'none';
// 	document.forms[1].reset();
// 	body.classList.remove("scroll_block");
// })

//__________________________________________________________________________________________________________________________________//
//POPUP MESSAGE ON/OFF

// btnSendMessage.addEventListener('click', function() {
//     popup.style.display = 'flex';
//     popupMessage.style.display = 'flex';
// 	body.classList.add("scroll_block");
// })

// btnMessageClose.addEventListener('click', function() {
// 	popup.style.display = 'none';
// 	popupMessage.style.display = 'none';
// 	document.forms[2].reset();
// 	body.classList.remove("scroll_block");
// })

//__________________________________________________________________________________________________________________________________//
//POPUP PROFILE CHANGE PASSWORD ON/OFF

// openChangePassword.addEventListener('click', function() {
//     popupProfile.style.display = 'flex';
//     popupChangePassword.style.display = 'flex';
// 	body.classList.add("scroll_block");
// })

// closeChangePassword.addEventListener('click', function() {
// 	popupProfile.style.display = 'none';
// 	popupChangePassword.style.display = 'none';
// 	body.classList.remove("scroll_block");
// })

//__________________________________________________________________________________________________________________________________//
//POPUP PROFILE CHANGE DATA ON/OFF

// openChangeData.addEventListener('click', function() {
//     popupProfile.style.display = 'flex';
//     popupChangeData.style.display = 'flex';
// 	body.classList.add("scroll_block");
// })

// closeChangeData.addEventListener('click', function() {
// 	popupProfile.style.display = 'none';
// 	popupChangeData.style.display = 'none';
// 	body.classList.remove("scroll_block");
// })


