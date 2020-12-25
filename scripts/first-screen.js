// * Объявляем переменные

const previousPage = 'index.html';
const nextPage = 'second-screen.html';
const nextButton = document.querySelector('.button_type_next');

// * Объявляем функции

function saveUserData () {
  const initiativeName = document.querySelector('#initiative_name').value;
  const userName = document.querySelector('#username').value;
  const userMail = document.querySelector('#user_email').value;

  localStorage.initiative_name = initiativeName;
  localStorage.initiative_username = userName;
  localStorage.initiative_usermail = userMail;
}

// * Вешаем слушатели событий

nextButton.addEventListener('click', saveUserData);