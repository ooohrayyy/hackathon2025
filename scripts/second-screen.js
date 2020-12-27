// * Объявляем переменные

const headerLinks = document.querySelectorAll('.header__link'); // Ссылки в хэдере
const aboutLink = document.querySelector('#about-link'); // Ссылка «О проекте»
const nextButtons = document.querySelectorAll('.button_type_next'); // Кнопки «Дальше»
const backButtons = document.querySelectorAll('.button_type_back'); // Кнопки «Назад»
const socialButtons = document.querySelectorAll('.footer__link'); // Кнопки соцсетей в футере

const categoryButtons = document.querySelectorAll('.category'); // Кнопки категорий

const previousPage = 'first-screen.html'; // Предыдущая страница
const nextPage = 'third-screen.html'; // Следующая страница

// * Объявляем функции

function validationAlert () { // Предупреждение валидации
  alert('Пожалуйста, выберите категорию');
}

// * Вешаем слушатели

headerLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (link != aboutLink) {
      alert('Эти ссылки пока не работают');
    }
  });
});

categoryButtons.forEach((button) => { // Логика кнопок категорий
  button.addEventListener('click', (evt) => {
    evt.preventDefault();

    const buttonsArray = Array.from(categoryButtons);
    const otherButtons = buttonsArray.filter(button => !(button === evt.target));

    otherButtons.forEach(button => {
      button.classList.remove('category_active');
    });

    const buttonValue = button.querySelector('.category__name').textContent;
    localStorage.category = buttonValue;
    button.classList.toggle('category_active');
  });
});

nextButtons.forEach((button) => { // Переход на следующую страницу
  button.addEventListener('click', (evt) => {
    evt.preventDefault();

    const activeCategory = document.querySelector('.category_active');

    if (activeCategory) {
      window.open(nextPage, '_self', false);
    } else {
      validationAlert();
    }
  });
});

backButtons.forEach((button) => { // Переход на страницу назад
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.open(previousPage, '_self', false);
  });
});

socialButtons.forEach((button) => { // Алерты на кнопках соцсетей в футере
  button.addEventListener('click', () => {
    alert('Тут будет переход на соцсети');
  });
});