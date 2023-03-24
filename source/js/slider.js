const slider = document.querySelector('.slider');
const wrapper = document.querySelector('.slider__wrapper');
const innerWrapper = document.querySelector('.slider__list');
const buttonBack = document.querySelector('.slider__back_js');
const buttonNext = document.querySelector('.slider__next_js');
const slides = [...document.querySelectorAll('.slider__slide')];
const slidesCount = slides.length;
const pagination = document.querySelector('.slider__pagination_js')
const animationTime = 500;

let timer = null;
let dots = [];
let sliderWidth = wrapper.offsetWidth;
let activeSlideIndex;


// Добавляем активный слайд в localStorage
const updateActiveSlide = () => {
	+localStorage.getItem('activeSlideIndex')
	? (activeSlideIndex = +localStorage.getItem('activeSlideIndex'))
	: (activeSlideIndex = 0);
}
updateActiveSlide();


window.addEventListener('resize', () => {
	initWidth();
	setActiveSlide(activeSlideIndex, false);
});

createDots();

// Переключения слайдов
function setActiveSlide (index, withAnimation = true) {
	if (index < 0 || index >= slidesCount) return;
	innerWrapper.style.transform = `translateX(${index * sliderWidth * (-1)}px)`

	buttonBack.removeAttribute('disabled');
	buttonNext.removeAttribute('disabled');

	if (withAnimation) {
		clearTimeout(timer);
		innerWrapper.style.transition = `transform ${animationTime}ms`;
		timer = setTimeout(() => {
			innerWrapper.style.transition = '';
		}, animationTime)
	}

	if (index === 0) {
		buttonBack.setAttribute('disabled', '');
	}
	if (index === slidesCount - 1) {
		buttonNext.setAttribute('disabled', '');
	}

	dots[activeSlideIndex].classList.remove('slider__dot__active');
	dots[index].classList.add('slider__dot__active');
	activeSlideIndex = index;
	localStorage.setItem('activeSlideIndex', activeSlideIndex);
};

initWidth();
setActiveSlide(activeSlideIndex);


// Инициилизируем ширину/адаптация слайдера
function initWidth () {
	sliderWidth = wrapper.offsetWidth;

	// Узнаем ширину слайдов
	slides.forEach(slide => {
		slide.style.width = `${sliderWidth}px`;
	});
};


// Кнопки переключения
buttonNext.addEventListener ('click', () => {
	setActiveSlide(activeSlideIndex + 1);
	// localStorage.setItem('activeSlideIndex', activeSlideIndex);
});

buttonBack.addEventListener ('click', () => {
	setActiveSlide(activeSlideIndex - 1);
	// localStorage.setItem('activeSlideIndex', activeSlideIndex);
});


// Создаем точки
function createDots() {
	for (let i = 0; i < slidesCount; i++) {
		const dot = createDot(i);
		dots.push(dot);
		pagination.insertAdjacentElement('beforeend', dot);
	}
};

function createDot(index) {
	const dot = document.createElement('button');
	dot.classList.add('slider__dot');

	if (index === activeSlideIndex) {
		dot.classList.add('slider__dot__active');
	}

	dot.addEventListener('click', () => {
		setActiveSlide(index);
	})

	return dot;
};