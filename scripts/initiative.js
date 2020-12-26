// * Подключаем стихи из внешнего источника

let rhymes = {};

const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        rhymes = JSON.parse(this.responseText);
    }
};

xmlhttp.open("GET", "https://raw.githubusercontent.com/IlyaGusev/PoetryCorpus/master/datasets/django/all_django.json", true);
xmlhttp.send();

// * Объявляем переменные

const initiativeTitle = document.querySelector('.initiative__title'); // Название инициативы
const mainIllustration = document.querySelector('.initiative__image'); // Иллюстрация к инициативе
const initiativeText = document.querySelector('.initiative__text'); // Текст инициативы

const supportButton = document.querySelector('.button_type_support'); // Кнопка «Подписать»
const shareButtons = document.querySelectorAll('.initiative__share-link'); // Кнопки шеринга в соцсетях
const newCommentButton = document.querySelector('.button_type_comment'); // Кнопка «Комментировать»

const commentsPopup = document.querySelector('.new-comment'); // Попап с коментариями
const usernameInput = commentsPopup.querySelector('#comment_username'); // Инпут с именем пользователя
const usermailInput = commentsPopup.querySelector('#comment_usermail'); // Инпут с почтой пользователя
const leaveCommentButton = commentsPopup.querySelector('.button_type_comment'); // Кнопка «Оставить комментарий»
const closeFormButton = commentsPopup.querySelector('.close'); // Кнопка закрытия попапа с комментариями
const generateRhymes = commentsPopup.querySelector('.button_type_refresh'); // Кнопка «Сгенерировать другой стих»
const commentOptions = commentsPopup.querySelectorAll('.new-comment__option'); // Кнопки-комментарии

// * Объявляем функции

function openCommentsPopup() { // Открытие попапа с комментариями
  commentsPopup.classList.add('new-comment_visible');
}

function refreshComments () { // Обновить стихи
  commentOptions.forEach(option => {
    const commentTextField = option.querySelector('.new-comment__text');
    const commentAuthor = option.querySelector('.new-comment__author');

    const rand = Math.floor(Math.random() * rhymes.length);
    const newObject = rhymes[rand];    

    const newRhymes = newObject.fields.text;
    const newAuthor = newObject.fields.author;

    commentTextField.textContent = newRhymes;
    commentAuthor.textContent = newAuthor;
  });
}

function closeCommentsPopup (evt) { // Закрытие попапа с комментариями
  evt.preventDefault();
  commentsPopup.classList.remove('new-comment_visible');
}

function saveUserInfo () { // Сохранение информации о пользователе
  localStorage.comment_username = usernameInput.value;
  localStorage.comment_usermail = usermailInput.value;
}

function putName () {
  if (localStorage.initiative_name) {
    initiativeTitle.textContent = localStorage.initiative_name;
  } else {
    initiativeTitle.textContent = '*Без названия*';
  }
}

function putIllustration () { // Загрузка иллюстрации из localStorage
  if (localStorage.initiative_image) {
    mainIllustration.src = localStorage.initiative_image;
  }
}

function putText () {
  if (localStorage.initiative_text) {
    initiativeText.textContent = localStorage.initiative_text;
  } else {
    initiativeText.textContent = '*Текста нет*';
  }
}

// * Вешаем слушатели событий

supportButton.addEventListener('click', () => { // Слушатель кнопки «Подписать»
  alert('Тут будет новое окно');
});

shareButtons.forEach((button) => { // Слушатель кнопок шеринга в соцсетях
  button.addEventListener('click', () => {
    alert('Тут будет шеринг в соцсетях');
  });
});

newCommentButton.addEventListener('click', openCommentsPopup); // Слушатель кнопки «Комментировать» на странице

leaveCommentButton.addEventListener('click', (evt) => { // Слушатель кнопки «Комментировать» в попапе
  evt.preventDefault();

  const activeOption = document.querySelector('.new-comment__option_active');

  if (activeOption) {
    saveUserInfo();
    alert('Пока оставлять комментарии нельзя');
  } else {
    alert('Пожалуйста, выберите подходящий комментарий');
  }
});

closeFormButton.addEventListener('click', closeCommentsPopup); // Слушатель кнопки закрытия попапа

generateRhymes.addEventListener('click', (evt) => { // Слушатель кнопки «Сгенерировать другие стихи»
  evt.preventDefault();
  refreshComments();
});

commentOptions.forEach((option) => { // Слушатели кнопок опций
  option.addEventListener('click', (evt) => {
    evt.preventDefault();

    const optionsArray = Array.from(commentOptions);
    const otherOptions = optionsArray.filter(option => !(option === evt.target));

    otherOptions.forEach(option => {
      option.classList.remove('new-comment__option_active');
    });

    const optionText = option.querySelector('.new-comment__text').textContent;
    localStorage.comment_text = optionText;

    option.classList.toggle('new-comment__option_active');
  });
});

// * Вызываем функции

putName();
putIllustration();
putText();