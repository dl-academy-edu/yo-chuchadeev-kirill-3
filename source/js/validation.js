const isEmailValid = (email) => {
	return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)
}

//LOGIN FORM
(function() {
	const loginForm = document.forms.login;
	const email = loginForm.elements.email;
	const password = loginForm.elements.password;

	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();
		
		const data = {
			email: email.value,
			password: password.value,
		}

		let errors = {};

		if(!isEmailValid(data.value)) {
			errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
		}
		if(data.password.length <= 6) {
			errors.password = 'Please increase your password';
		}

		if(!Object.keys(errors).length) {
			//validation +
		} else {
			//validation -
		}
	})
})();


// REGISTER FORM
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