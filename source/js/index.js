let body = document.querySelector('#body')
let popup = document.querySelector('.popup')

let btnSignIn = document.querySelector('.btn__signin_js')
let	popupLogin = document.querySelector('.popup__login')
let btnLoginClose = document.querySelector('.login__close_js')

let btnRegister = document.querySelector('.btn__register_js')
let popupRegister = document.querySelector('.popup__register')
let btnRegisterClose = document.querySelector('.register__close_js')

let btnSendMessage = document.querySelector('.btn__message_js')
let popupMessage = document.querySelector('.popup__message')
let btnMessageClose = document.querySelector('.message__close_js')



///// login

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

///// Register

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

///// Message

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