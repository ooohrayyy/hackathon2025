// * Объявляем переменные

const headerLinks = document.querySelectorAll('.header__link'); // Ссылки в хэдере

const previousPage = 'index.html'; // Предыдущая страница
const nextPage = 'second-screen.html'; // Следующая страница

const nameInput = document.querySelector('#initiative_name'); // Поле ввода названия инициативы
const usernameInput = document.querySelector('#initiative_username'); // Поле ввода имени пользователя
const mailInput = document.querySelector('#initiative_usermail'); // Поле ввода почты пользователя

// const backButton = document.querySelector('.button_type_back'); // Кнопка «Назад»
const nextButton = document.querySelector('.button_type_next'); // Кнопка «Дальше»

const socialButtons = document.querySelectorAll('.footer__link'); // Кнопки соцсетей

// * Объявляем функции

function checkData () {
  if (nameInput.validity.valid && usernameInput.validity.valid && mailInput.validity.valid) {
    return true;
  } else {
    return false;
  }
}

function saveUserData () { // Сохранить пользовательские данные
  const initiativeName = document.querySelector('#initiative_name').value;
  const userName = document.querySelector('#initiative_username').value;
  const userMail = document.querySelector('#initiative_usermail').value;

  localStorage.initiative_name = initiativeName;
  localStorage.initiative_username = userName;
  localStorage.initiative_usermail = userMail;
}

// * Вешаем слушатели событий

headerLinks.forEach((link) => { // Слушатель ссылок в хэдере
  link.addEventListener('click', () => {
    alert('Эти ссылки пока не работают');
  });
});

// backButton.addEventListener('click', (evt) => { // Слушатель кнопки «Назад»
//   evt.preventDefault();
//   window.open(previousPage, '_self', false);
// });

nextButton.addEventListener('click', (evt) => { // Слушатель кнопки «Дальше»
  evt.preventDefault();

  if (checkData()) {
    saveUserData();
    window.open(nextPage, '_self', false);
  } else {
    alert('Пожалуйста, заполните все поля');
  }
});

socialButtons.forEach((button) => { // Слушатель кнопок соцсетей
  button.addEventListener('click', () => {
    alert('Тут будет переход на соцсети');
  });
});
