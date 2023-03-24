const swiper = document.querySelector('.swiper');

let mySwiper = new Swiper(swiper, {
	spaceBetween: 20,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	  },
});