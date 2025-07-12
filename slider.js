const track = document.querySelector('.slider-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');
const dotsContainer = document.querySelector('.slider-dots');

let currentIndex = 0;
const slideCount = slides.length;
let intervalId = null;
const autoSlideDelay = 5000; //5 секунд

// Создаем точки
for (let i = 0; i < slideCount; i++) {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetAutoSlide();
  });
  dotsContainer.appendChild(dot);
}

const dots = Array.from(dotsContainer.children);

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${100 * currentIndex}%)`;
  updateDots();
}

function nextSlide() {
  if (currentIndex === slideCount - 1) {
    // Без анимации мгновенно переключаемся на первый слайд
    currentIndex = 0;
    track.style.transition = 'none';
    track.style.transform = `translateX(0%)`;
    updateDots();

    // Возвращаем плавность через небольшой таймаут
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  } else {
    currentIndex++;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${100 * currentIndex}%)`;
    updateDots();
  }
}

function prevSlide() {
  if (currentIndex === 0) {
    currentIndex = slideCount - 1;
  } else {
    currentIndex--;
  }
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${100 * currentIndex}%)`;
  updateDots();
}

function resetAutoSlide() {
  clearInterval(intervalId);
  intervalId = setInterval(nextSlide, autoSlideDelay);
}

// Кнопки вперед/назад
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

// Запускаем автопроигрывание
intervalId = setInterval(nextSlide, autoSlideDelay);




let startX = 0;
let endX = 0;

const slider = document.querySelector('.slider');

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

slider.addEventListener('touchend', () => {
  const distance = endX - startX;

  if (Math.abs(distance) > 50) { // минимальная длина свайпа
    if (distance < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    resetAutoSlide();
  }

  // Сброс значений
  startX = 0;
  endX = 0;
});