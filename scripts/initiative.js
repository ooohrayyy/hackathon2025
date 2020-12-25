// * Объявляем переменные

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

function openCommentsPopup() {
  commentsPopup.classList.add('new-comment_visible');
}

function closeCommentsPopup (evt) {
  evt.preventDefault();
  commentsPopup.classList.remove('new-comment_visible');
}

function saveUserInfo () {
  localStorage.comment_username = usernameInput.value;
  localStorage.comment_usermail = usermailInput.value;
}

// * Вешаем слушатели событий

supportButton.addEventListener('click', () => {
  alert('Тут будет новое окно');
});

shareButtons.forEach((button) => {
  button.addEventListener('click', () => {
    alert('Тут будет шеринг в соцсетях');
  });
});

newCommentButton.addEventListener('click', openCommentsPopup);

leaveCommentButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  saveUserInfo();

  alert('Пока оставлять комментарии нельзя');
});

closeFormButton.addEventListener('click', closeCommentsPopup);

generateRhymes.addEventListener('click', (evt) => {
  evt.preventDefault();
  alert('Пока генерировать комментарии нельзя');
});

commentOptions.forEach((option) => {
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