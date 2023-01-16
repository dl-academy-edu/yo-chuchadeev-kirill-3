// PROFILE
// const popupProfile = document.querySelector('.popup__profile');

const popupChangePassword = document.querySelector('.popup__change__password');
const openChangePassword = document.querySelector('.open_change_password_js');
const closeChangePassword = document.querySelector('.close_change_password_js');
const popupChangeData = document.querySelector('.popup__change__data');
const openChangeData = document.querySelector('.open_change_data_js');
const closeChangeData = document.querySelector('.close_change_data_js');


// ПОЛУЧЕНИЕ ДАННЫХ ПРОФИЛЯ И ОТОБРАЖЕНИЕ
(function() {
	const profileImg = document.querySelector('.profile__avatar');
	const profileDefaultImg = document.querySelector('.profile__avatar_img');	
	const profileName = document.querySelector('.profile__name');
	const profileSurname = document.querySelector('.profile__surname');
	const profileEmail = document.querySelector('.profile__email');
	const profileLocation = document.querySelector('.profile__location');
	const profileAge = document.querySelector('.profile__age');

	const changeDataForm = document.forms.change__data__form;

	let profile = null;

	// rerenderLinks();
	
	getProfile();

	function renderProfile() {
		profileImg.style.backgroundImage = `url(${BASE_SERVER_PATH + profile.photoUrl})`;
		profileName.innerText = profile.name;
		profileSurname.innerText = profile.surname;
		profileEmail.innerText = profile.email;
		profileLocation.innerText = profile.location;
		profileAge.innerText = profile.age;
		if(profileImg) {
			profileDefaultImg.classList.toggle('close');
		}
	}

	function getProfile() {
		showLoader();
		sendRequest({
			method: 'GET',
			url: `/api/users/${localStorage.getItem('userId')}`,
		})
		.then((res) => res.json())
		.then((res) => {
			if(res.success) {
				profile = res.data;
				renderProfile();
			} else {
				throw new Error(`${res.status} ${res.message}`)
			};
		})
		.catch((err) => {
			// err = err.split(' ');
			// if(+err[0] === 204) {
			// 	alert(err[message]);
			// }
		})
		hideLoader();
	}


	// ИЗМЕНЕНИЕ ДАННЫХ ПРОФИЛЯ
	const changeData = (e) => {
		e.preventDefault();
		const data = new FormData(changeDataForm);
		showLoader();
		sendRequest({
			method: 'PUT',
			url: '/api/users',
			body: data,
			headers: {
				'x-access-token': localStorage.getItem('token'),
			}
		})
		.then(res => {
			if(res.status === 401 || res.status === 403) {
				localStorage.removeItem('token');
				localStorage.removeItem('userId');
				location.pathname = '/';
				return;
			}
			return res.json();
		})
		.then(res => {
			if(res.success) {
				profile = res.data;
				renderProfile();
			} else {
				throw res;
			}
		})
		.catch(err => {
			if(err._message) {
				alert(err._message);
			}
			clearErrors(changeDataForm);
			errorFormHandler(err.errors, changeDataForm);
		})
		.finally(() => {
			interactionModal(popupChangeData);
		})
		hideLoader();
	}

	openChangeData.addEventListener('click', () => {
		changeDataForm.email.value = profile.email;
		changeDataForm.name.value = profile.name;
		changeDataForm.surname.value = profile.surname;
		changeDataForm.location.value = profile.location;
		changeDataForm.age.value = profile.age;
		interactionModal(popupChangeData);

	closeChangeData.addEventListener('click', function() {
		interactionModal(popupChangeData);
	})

	popupChangeData.addEventListener('submit', changeData);
	})
})();


// СМЕНА ПАРОЛЯ
(function changePassword() {
	const passwordForm = document.forms.change__password__form;
	const popupSuccess = document.querySelector('.popup__status__success');
	const popupError = document.querySelector('.popup__status__error');

	const password = (e) => {
		e.preventDefault();
		// let data = {};

// ВАЛИДАЦИЯ ПАРОЛЕЙ
		let errors = {};
		let truths = {};

		clearErrors(passwordForm);
		clearTruths(passwordForm);

		const data = new FormData(passwordForm);

		const oldPassword = passwordForm.oldPassword.value;
		const newPassword = passwordForm.newPassword.value;
		const repeatPassword = passwordForm.repeatPassword.value;

		if(newPassword.length < 6) {
			errors.newPassword = 'Please increase your password';
		} else {
			truths.newPassword = 'All good';
		}

		if(oldPassword.length < 6) {
			errors.oldPassword = 'Please increase your password';
		} else {
			truths.oldPassword = 'Password is correct';
		}

		if(newPassword === repeatPassword) {
			truths.repeatPassword = 'Passwords match';
		} else { 
			errors.repeatPassword = 'Passwords do not match';
		}

		if(Object.keys(truths).length) {
			Object.keys(truths).forEach((key) => {
				const messageTrurh = truths[key];
				const input = passwordForm.elements[key];
				setTruthText(input, messageTrurh);
			})
		}	
		if(Object.keys(errors).length) {
			Object.keys(errors).forEach((key) => {
				const messageError = errors[key];
				const input = passwordForm.elements[key];
				setErrorText(input, messageError);
			})
			return;
		}


// ОТПРАВКА ПАРОЛЕЙ
		showLoader();
		sendRequest({
			url: '/api/users',
			method: 'PUT',
			body: data,
			headers: {
				'x-access-token': localStorage.getItem('token'),
				'userId': localStorage.getItem('userId'),
			},
		})
		.then(res => {
			if(res.status === 401 || res.status === 403) {
				// localStorage.removeItem('token');
				// localStorage.removeItem('userId');
				// location.pathname = '/';
				return;
			}
			return res.json();
		})
		.then(res => {
			if(res.success) {
				popupStatusOpen(popupSuccess);
				// renderProfile();
			} else {
				throw res;
			}
		})
		.catch(err => {
			popupStatusOpen(popupError);
			if(err._message) {
				alert(err._message);
			}
			clearErrors(passwordForm);
			// errorFormHandler(err.errors, passwordForm);
		})
		.finally(() => {
			// interactionModal(popupChangePassword);
			passwordForm.reset();
		})
		hideLoader();
	}

	openChangePassword.addEventListener('click', function() {
		interactionModal(popupChangePassword);
	});
	
	closeChangePassword.addEventListener('click', function() {
		passwordForm.reset();
		interactionModal(popupChangePassword);
		clearErrors(passwordForm);
		clearTruths(passwordForm);
	});

	popupChangePassword.addEventListener('submit', password);
})();


// ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ О СТАТУСАХ ИЗМЕНЕНИЙ ДАННЫХ ПРОФИЛЯ
function popupStatusOpen(popupStatus) {
	popupStatus.classList.remove('close');
	popupStatus.classList.add('open');
	body.classList.toggle('scroll_block');

	buttonClose = popupStatus.querySelector('button');

	buttonClose.addEventListener('click', () => {
		popupStatusClose(popupStatus);
	})
};

function popupStatusClose(popupStatus) {
	popupStatus.classList.remove('open');
	popupStatus.classList.add('close');
	body.classList.toggle('scroll_block');
	// popup.classList.add('close');
};


// ЗАМЕНА ИМЕНИ ИНПУТА НА ИМЯ ФАЙЛА
(function changeInputName() {
	const changeDataForm = document.forms.change__data__form;

	if(!changeDataForm) return;
	const inputFile = changeDataForm.elements.avatar;
	const inputFileName = document.querySelector(".input__file__name");	
  
	inputFile.addEventListener("change", function (e) {
	  	let fileName = this.files[0].name;
		const fileNameCorrect = trimFileName(fileName);
	  	if(fileNameCorrect) {
			inputFileName.innerHTML = '';
			inputFileName.innerHTML = fileNameCorrect;
	  	}
	});
})();

function trimFileName(fileName) {
	let delimiter = fileName.lastIndexOf('.');
	let extension = fileName.substr(delimiter);
	let file = fileName.substr(0, delimiter);

	let filenameLen = 10; 
	return (file.length > filenameLen ? file.substr(0, filenameLen) + "..." : file) + extension;
}
// var textWidth = document.getElementById("text").clientWidth;








console.log(`userId: `+localStorage.getItem('userId'));
const btn_delete = document.querySelector('.delete_account_js');

// УДАЛЕНИЕ АККАУНТА
btn_delete.addEventListener('click', function() {
	const isLogin = localStorage.getItem('token');

	if(isLogin) rerenderLinks();

	sendRequest({
		method: 'DELETE',
		url: '/api/users/:id',
		body: null,
		headers: {
			'x-access-token': localStorage.getItem('token'),
			'userId': localStorage.getItem('userId'),
		},
	})
	.then(res => res.json())
	.then(res => {
		// if(res._message) {
		// 	let userError = res._message;
		// }
		localStorage.removeItem('token', res.data.token);
		localStorage.removeItem('userId', res.data.userId);
		rerenderLinks();
	})
	.catch(err => {
	})
	// .finally(() => {
	// 	location.pathname = '/';
	// 	rerenderLinks();
	// })
});