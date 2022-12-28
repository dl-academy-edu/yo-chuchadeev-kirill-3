const body = document.querySelector('#body');
const popup = document.querySelector('.popup');

const btnSignIn = document.querySelector('.btn__signin_js');
const popupLogin = document.querySelector('.popup__login');
const btnLoginClose = document.querySelector('.login__close_js');

const btnRegister = document.querySelector('.btn__register_js');
const popupRegister = document.querySelector('.popup__register');
const btnRegisterClose = document.querySelector('.register__close_js');

const btnSendMessage = document.querySelector('.btn__message_js');
const popupMessage = document.querySelector('.popup__message');
const btnMessageClose = document.querySelector('.message__close_js');


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

btnSignIn.addEventListener('click', function() {
    popup.style.display = 'flex';
    popupLogin.style.display = 'flex';
	body.classList.add("scroll_block")
})

btnLoginClose.addEventListener('click', function() {
	popup.style.display = 'none';
	popupLogin.style.display = 'none';
	body.classList.remove("scroll_block")
})

//__________________________________________________________________________________________________________________________________//
// POPUP REGISTRATION ON/OFF

btnRegister.addEventListener('click', function() {
    popup.style.display = 'flex';
    popupRegister.style.display = 'flex';
	body.classList.add("scroll_block")
})

btnRegisterClose.addEventListener('click', function() {
	popup.style.display = 'none';
	popupRegister.style.display = 'none';
	body.classList.remove("scroll_block")
})

//__________________________________________________________________________________________________________________________________//
//POPUP MESSAGE ON/OFF

btnSendMessage.addEventListener('click', function() {
    popup.style.display = 'flex';
    popupMessage.style.display = 'flex';
	body.classList.add("scroll_block")
})

btnMessageClose.addEventListener('click', function() {
	popup.style.display = 'none';
	popupMessage.style.display = 'none';
	body.classList.remove("scroll_block")
})