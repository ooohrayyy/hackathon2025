// * Подключаем стихи из внешнего источника

let rhymes = {};

const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        rhymes = JSON.parse(this.responseText);
    }
};

xmlhttp.open("GET", "https://raw.githubusercontent.com/IlyaGusev/PoetryCorpus/master/datasets/django/all_django.json", false);
xmlhttp.send();

// * Объявляем переменные

const initiativeTitle = document.querySelector('.initiative__title'); // Название инициативы
const mainIllustration = document.querySelector('.initiative__image'); // Иллюстрация к инициативе
const initiativeText = document.querySelector('.initiative__text'); // Текст инициативы

const initialComments = document.querySelectorAll('.comment'); // Комментарии «из коробки»

const commentsContainer = document.querySelector('.initiative__comments'); // Контейнер с комментариями
const likeButtons = document.querySelectorAll('.comment__like'); // Кнопки лайков

const supportButton = document.querySelector('.button_type_support'); // Кнопка «Подписать»
const shareButtons = document.querySelectorAll('.initiative__share-link'); // Кнопки шеринга в соцсетях
const newCommentButton = document.querySelector('.button_type_comment'); // Кнопка «Комментировать»

const commentsPopup = document.querySelector('.new-comment'); // Попап с коментариями
const usernameInput = commentsPopup.querySelector('#comment_username'); // Инпут с именем пользователя
const usermailInput = commentsPopup.querySelector('#comment_usermail'); // Инпут с почтой пользователя
const leaveCommentButton = commentsPopup.querySelector('.button_type_comment'); // Кнопка «Оставить комментарий»
const closeFormButton = commentsPopup.querySelector('.close'); // Кнопка закрытия попапа с комментариями
let commentErrors = commentsPopup.querySelectorAll('.new-comment__text-error'); // Ошибки загрузки стихотворений
const generateRhymes = commentsPopup.querySelector('.button_type_refresh'); // Кнопка «Сгенерировать другой стих»
const commentOptions = commentsPopup.querySelectorAll('.new-comment__option'); // Кнопки-комментарии

const commentTemplate = document.querySelector('#template-comment'); // Шаблон комментария

// * Объявляем функции

// -- Открытие и закрытие попапа

function openCommentsPopup () { // Открытие попапа с комментариями
  refreshComments();
  commentsPopup.classList.add('new-comment_visible');
}

function closeCommentsPopup (evt) { // Закрытие попапа с комментариями
  evt.preventDefault();
  commentsPopup.classList.remove('new-comment_visible');
}

// -- Отрисовка инициативы

function putName () { // Отрисовка названия инициативы
  if (localStorage.initiative_name) {
    initiativeTitle.textContent = localStorage.initiative_name;
  } else {
    initiativeTitle.textContent = '*Без названия*';
  }
}

function putIllustration () { // Отрисовка иллюстрации к инициативе
  if (localStorage.initiative_image) {
    mainIllustration.src = localStorage.initiative_image;
  }
}

function putText () { // Отрисовка текста инициативы
  if (localStorage.initiative_text) {
    initiativeText.textContent = localStorage.initiative_text;
  } else {
    initiativeText.textContent = '*Текста нет*';
  }
}

// -- Отрисовка рандомных комментариев

function putRandomComments () { // Отрисовка рандомных комментариев
  initialComments.forEach(comment => {
    const commentAuthor = comment.querySelector('.comment__author');
    const commentText = comment.querySelector('.comment__text');
    const commentLikes = comment.querySelector('.comment__like-count');

    const newObject = getRandomRhymeObject();

    commentAuthor.textContent = newObject.fields.author;
    commentText.textContent = newObject.fields.text;
    commentLikes.textContent = getRandomInteger(1, 1432);
  });

  localStorage.initial_comments_generated = 'true';
  saveGeneratedComments();
}

function getRandomInteger (min, max) { // Получение случайного числа
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function saveGeneratedComments () { // Сохранить сгенерированные комментарии
  localStorage.initial_comments_1_author = initialComments[0].querySelector('.comment__author').textContent;
  localStorage.initial_comments_1_text = initialComments[0].querySelector('.comment__text').textContent;
  localStorage.initial_comments_1_likes = initialComments[0].querySelector('.comment__like-count').textContent;

  localStorage.initial_comments_2_author = initialComments[1].querySelector('.comment__author').textContent;
  localStorage.initial_comments_2_text = initialComments[1].querySelector('.comment__text').textContent;
  localStorage.initial_comments_2_likes = initialComments[1].querySelector('.comment__like-count').textContent;
  
  localStorage.initial_comments_3_author = initialComments[2].querySelector('.comment__author').textContent;
  localStorage.initial_comments_3_text = initialComments[2].querySelector('.comment__text').textContent;
  localStorage.initial_comments_3_likes = initialComments[2].querySelector('.comment__like-count').textContent;
}

function putSavedComments () { // Вставить сохранённые комментарии
  initialComments[0].querySelector('.comment__author').textContent = localStorage.initial_comments_1_author;
  initialComments[0].querySelector('.comment__text').textContent = localStorage.initial_comments_1_text;
  initialComments[0].querySelector('.comment__like-count').textContent = localStorage.initial_comments_1_likes;

  initialComments[1].querySelector('.comment__author').textContent = localStorage.initial_comments_2_author;
  initialComments[1].querySelector('.comment__text').textContent = localStorage.initial_comments_2_text;
  initialComments[1].querySelector('.comment__like-count').textContent = localStorage.initial_comments_2_likes;
  
  initialComments[2].querySelector('.comment__author').textContent = localStorage.initial_comments_3_author;
  initialComments[2].querySelector('.comment__text').textContent = localStorage.initial_comments_3_text;
  initialComments[2].querySelector('.comment__like-count').textContent = localStorage.initial_comments_3_likes;
}

// -- Логика лайков

function addLike (evt) { // Добавление лайка
  const button = evt.target;
  const countElement = button.nextElementSibling;
  const countedLikes = countElement.textContent;

  countElement.textContent = +countedLikes + 1;
  button.classList.add('comment__like_active');

  button.removeEventListener('click', addLike);
  button.addEventListener('click', removeLike);
}

function removeLike (evt) { // Удаление лайка
  const button = evt.target;
  const countElement = button.nextElementSibling;
  const countedLikes = countElement.textContent;

  countElement.textContent = +countedLikes - 1;
  button.classList.remove('comment__like_active');

  button.removeEventListener('click', removeLike);
  button.addEventListener('click', addLike);
}

function saveLikesCondition () { // Сохранить состояние лайков
  const allLikeButtons = document.querySelectorAll('.comment__like');
  const likeButtonsLength = allLikeButtons.length;

  for (i = 0; i < likeButtonsLength; i++) {
    console.log(allLikeButtons);
    console.log(allLikeButtons[i]);
    localStorage.setItem(`comment_likes_count_${i}`, allLikeButtons[i].nextElementSibling.textContent);

    if (allLikeButtons[i].classList.contains('comment__like_active')) {
      localStorage.setItem(`comment_likes_state_${i}`, 'active');
    } else {
      localStorage.setItem(`comment_likes_state_${i}`, 'inactive');
    }
  }
}

// -- Логика формирования комментариев

function dismissCommentsErrors () { // Удаление ошибок загрузки комментариев
  if (commentErrors) {
    commentErrors.forEach(error => {
      error.remove();
      error = null;
    });
  
    commentErrors = null;
  }
}

function getRandomRhymeObject () { // Получить случаный объект со стихотворением
  const rand = Math.floor(Math.random() * rhymes.length);
  const newObject = rhymes[rand];
  return newObject;
}

function checkName (name) { // Проверить имя автора на валидность
  if (name == 'Валерий Брюсов' ||
    name == 'Владимир Маяковский' ||
    name == 'Илья Эренбург' ||
    name == 'Владимир Высоцкий' ||
    name == 'Зинаида Гиппиус' ||
    name == 'Корней Чуковский' ||
    name == 'Евгений Баратынский' ||
    name == 'Афанасий Фет' ||
    name == 'Игорь Северянин' ||
    name == 'Анна Ахматова' ||
    name == 'Сергей Есенин' ||
    name == 'Александр Блок' ||
    name == 'Николай Гумилев' ||
    name == 'Белла Ахмадулина' ||
    name == 'Велимир Хлебников') {
      return true;
    } else {
      return false;
    }
}

function putPhoto (author, option) { // Вставить фотографию автора
  const authorPic = option.querySelector('.new-comment__image');

  switch (author) {
    case 'Валерий Брюсов':
      authorPic.src = 'resources/images/authors/brusov.png';
      break;
    case 'Владимир Маяковский':
      authorPic.src = 'resources/images/authors/mayak.png';
      break;
    case 'Илья Эренбург':
      authorPic.src = 'resources/images/authors/erenburg.png';
      break;
    case 'Владимир Высоцкий':
      authorPic.src = 'resources/images/authors/vys.png';
      break;
    case 'Зинаида Гиппиус':
      authorPic.src = 'resources/images/authors/gippius.png';
      break;
    case 'Корней Чуковский':
      authorPic.src = 'resources/images/authors/chuk.png';
      break;
    case 'Евгений Баратынский':
      authorPic.src = 'resources/images/authors/barat.png';
      break;
    case 'Афанасий Фет':
      authorPic.src = 'resources/images/authors/fet.png';
      break;
    case 'Игорь Северянин':
      authorPic.src = 'resources/images/authors/sev.png';
      break;
    case 'Анна Ахматова':
      authorPic.src = 'resources/images/authors/ah.png';
      break;
    case 'Сергей Есенин':
      authorPic.src = 'resources/images/authors/es.png';
      break;
    case 'Александр Блок':
      authorPic.src = 'resources/images/authors/blok.png';
      break;
    case 'Николай Гумилев':
      authorPic.src = 'resources/images/authors/gum.png';
      break;
    case 'Белла Ахмадулина':
      authorPic.src = 'resources/images/authors/bella.png';
      break;
    case 'Велимир Хлебников':
      authorPic.src = 'resources/images/authors/hleb.png';
      break;
    default:
      authorPic.src = 'resources/images/userpic-placeholder.png';
      refreshComments();
  }
}

function refreshComments () { // Обновить варианты комментариев
  dismissCommentsErrors();

  commentOptions.forEach(option => {
    const commentTextField = option.querySelector('.new-comment__text');
    const commentAuthor = option.querySelector('.new-comment__author');

    let newObject = getRandomRhymeObject();
    let newRhymes = newObject.fields.text;
    let newAuthor = newObject.fields.author;

    while (!checkName(newAuthor)) {
      newObject = getRandomRhymeObject();
      newRhymes = newObject.fields.text;
      newAuthor = newObject.fields.author;
    }

    putPhoto(newAuthor, option);

    commentTextField.textContent = newRhymes;
    commentAuthor.textContent = newAuthor;
  });
}

function checkUserInfo () { // Валидация пользовательских данных
  if (usernameInput.validity.valid && usermailInput.validity.valid) {
    return true;
  } else {
    return false;
  }
}

function saveUserInfo () { // Сохранение пользовательской информации
  localStorage.comment_username = usernameInput.value;
  localStorage.comment_usermail = usermailInput.value;
}

function saveCommentText () {
  const activeOption = commentsPopup.querySelector('.new-comment__option_active');
  const commentText = activeOption.querySelector('.new-comment__text').textContent;

  localStorage.comment_text = commentText;
}

// -- Добавление нового комментария

function createNewComment () { // Создание нового комментария
  const newComment = commentTemplate.cloneNode(true).content;

  const newCommentAuthor = newComment.querySelector('.comment__author');
  const newCommentText = newComment.querySelector('.comment__text');

  newCommentAuthor.textContent = localStorage.comment_username;
  newCommentText.textContent = localStorage.comment_text;

  return newComment;
}

function addNewComment () { // Добавление нового комментария
  const newComment = createNewComment();
  const commentsTitle = commentsContainer.querySelector('.initiative__comments-title');
  commentsTitle.after(newComment);
}

function goUp () { // Прокрутка страницы наверх
  window.scrollBy(0, -100000);
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

likeButtons.forEach(button => { // Слушатель кнопок лайков
  button.addEventListener('click', addLike);
});

newCommentButton.addEventListener('click', openCommentsPopup); // Слушатель кнопки «Комментировать» на странице

leaveCommentButton.addEventListener('click', (evt) => { // Слушатель кнопки «Комментировать» в попапе
  evt.preventDefault();

  if (checkUserInfo()) {
    const activeOption = document.querySelector('.new-comment__option_active');

    if (activeOption) {
      saveUserInfo();
      saveCommentText();
      addNewComment();
      commentsPopup.classList.remove('new-comment_visible');
      goUp();
    } else {
      alert('Пожалуйста, выберите подходящий комментарий');
    }
  } else {
    alert('Пожалуйста, заполните все поля');
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

    option.classList.toggle('new-comment__option_active');
  });
});

// * Вызываем функции

putName();
putIllustration();
putText();

if (localStorage.initial_comments_generated) {
  putSavedComments();
} else {
  putRandomComments();
}