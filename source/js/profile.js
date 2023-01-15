// PROFILE
// const popupProfile = document.querySelector('.popup__profile');

const popupChangePassword = document.querySelector('.popup__change__password');
const openChangePassword = document.querySelector('.open_change_password_js');
const closeChangePassword = document.querySelector('.close_change_password_js');
const popupChangeData = document.querySelector('.popup__change__data');
const openChangeData = document.querySelector('.open_change_data_js');
const closeChangeData = document.querySelector('.close_change_data_js');


// const passwordOldForm = document.forms.password__old;
// const passwordNewForm = document.forms.password__new;
// const passwordRepeatForm = document.forms.password__repeat;
// btn_change_data_js




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
	}


	// ИЗМЕНЕНИЕ ДАННЫХ ПРОФИЛЯ
	const changeData = (e) => {
		e.preventDefault();
		const data = new FormData(changeDataForm);
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
	}

	openChangeData.addEventListener('click', () => {
		changeDataForm.email.value = profile.email;
		changeDataForm.name.value = profile.name;
		changeDataForm.surname.value = profile.surname;
		changeDataForm.location.value = profile.location;
		changeDataForm.age.value = profile.age;
		interactionModal(popupChangeData);
	})

	closeChangeData.addEventListener('click', function() {
		interactionModal(popupChangeData);
	})

	popupChangeData.addEventListener('submit', changeData);
})();


// СМЕНА ПАРОЛЯ
(function changePassword() {
	const passwordForm = document.forms.change__password__form;

	const password = (e) => {
		e.preventDefault();
		// let data = {};
		// data.oldPassword = passwordForm.password__old.value;
		// data.newPassword = passwordForm.password__new.value;
		const data = new FormData(passwordForm);
		const popupSuccess = document.querySelector('.popup__status__success');
		const popupError = document.querySelector('.popup__status__error');

		// validation

		sendRequest({
			method: 'PUT',
			url: '/api/users',
			body: data,
			headers: {
				'x-access-token': localStorage.getItem('token'),
				'userId': localStorage.getItem('userId'),
			}
		})
		.then(res => {
			if(res.status === 401 || res.status === 403) {
				// localStorage.removeItem('token');
				// localStorage.removeItem('userId');
				// location.pathname = '/';
				popupStatusOpen(popupError);
				return;
			}
			return res.json();
		})
		.then(res => {
			if(res.success) {
				popupStatusOpen(popupSuccess);
				renderProfile();
			} else {
				throw res;
			}
		})
		.catch(err => {
			if(err._message) {
				alert(err._message);
			}
			clearErrors(passwordForm);
			errorFormHandler(err.errors, passwordForm);
		})
		.finally(() => {
			interactionModal(popupChangePassword);
			passwordForm.reset();
		})
	}

	openChangePassword.addEventListener('click', function() {
		interactionModal(popupChangePassword);
	});
	
	closeChangePassword.addEventListener('click', function() {
		interactionModal(popupChangePassword);
	});

	popupChangePassword.addEventListener('submit', password);
})();

function popupStatusOpen(popupStatus) {
	popupStatus.classList.remove("close");
	popupStatus.classList.add("open");
	body.classList.toggle("scroll_block");

	buttonClose = popupStatus.querySelector('button');

	buttonClose.addEventListener('click', () => {
		popupStatusClose(popupStatus);
	})
};

function popupStatusClose(popupStatus) {
	popupStatus.classList.remove("open");
	popupStatus.classList.add("close");
	body.classList.toggle("scroll_block");
}
