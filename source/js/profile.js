//popup profile
// const popupProfile = document.querySelector('.popup__profile');

const popupChangePassword = document.querySelector('.popup__change__password');
const openChangePassword = document.querySelector('.open_change_password_js');
const closeChangePassword = document.querySelector('.close_change_password_js');
const popupChangeData = document.querySelector('.popup__change__data');
const openChangeData = document.querySelector('.open_change_data_js');
const closeChangeData = document.querySelector('.close_change_data_js');


//__________________________________________________________________________________________________________________________________//
//POPUP PROFILE CHANGE PASSWORD ON/OFF

openChangePassword.addEventListener('click', function() {
	interactionModal(popupChangePassword);
	// popup.classList.toggle("close");
	// popupChangePassword.classList.toggle("close");
	// body.classList.add("scroll_block");
});


closeChangePassword.addEventListener('click', function() {
	interactionModal(popupChangePassword);
	// popup.classList.toggle("close");
	// popupChangePassword.classList.toggle("close");
	// body.classList.remove("scroll_block");
});

//__________________________________________________________________________________________________________________________________//
//POPUP PROFILE CHANGE DATA ON/OFF
// openChangeData.addEventListener('click', function() {
// 	popupProfile.classList.toggle("close");
// 	popupChangeData.classList.toggle("close");
// 	body.classList.add("scroll_block");
// });

// closeChangeData.addEventListener('click', function() {
// 	popupProfile.classList.toggle("close");
// 	popupChangeData.classList.toggle("close");
// 	body.classList.remove("scroll_block");
// });

//__________________________________________________________________________________________________________________________________//
//PROFILE INFO ON PAGE
(function() {
	const profileImg = document.querySelector('.profile__avatar')
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
		profileImg.style.backgroundImg = `url(${BASE_SERVER_PATH + profile.photoUrl})`;
		profileName.innerText = profile.name;
		profileSurname.innerText = profile.surname;
		profileEmail.innerText = profile.email;
		profileLocation.innerText = profile.location;
		profileAge.innerText = profile.age;
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