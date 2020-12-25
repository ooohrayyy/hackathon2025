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

const previousPage = 'third-screen.html'; // Предыдущая страница

const authorName = document.querySelector('.form__author'); // Имя автора

const generateRhymes = document.querySelector('.button_type_refresh'); // Кнопка «Сгенерировать другой стих»

const doneButton = document.querySelector('.button_type_next'); // Кнопка «Дальше»

const popup = document.querySelector('.done'); // Попап «Готово»
const nextMove = popup.querySelector('.button'); // Кнопка «Дальше» в попапе

// * Объявляем функции

function openPopup () { // Открыть попап «Готово»
  popup.classList.add('done_visible');
}

function refreshText () { // Обновить стихи
  const initiativeTextField = document.querySelector('.form__input_type_textarea');

  const rand = Math.floor(Math.random() * rhymes.length);
  const newObject = rhymes[rand];

  const newRhymes = newObject.fields.text;
  const newAuthor = newObject.fields.author;
  
  initiativeTextField.value = newRhymes;
  authorName.textContent = newAuthor;
}

function saveText () { // Сохранить стихи в localStorage
  const initiativeText = document.querySelector('.form__input_type_textarea').value;
  localStorage.initiative_text = initiativeText;
}

// * Вешаем слушатели событий

doneButton.addEventListener('click', (evt) => { // Кнопка «Дальше»
  evt.preventDefault();
  saveText();
  openPopup();
});

nextMove.addEventListener('click', (evt) => { // Кнопка «Дальше» в попапе
  evt.preventDefault();
  window.open('fresh-initiative.html', '_self', false);
});

generateRhymes.addEventListener('click', (evt) => { // Кнопка «Сгенерировать другой стих»
  evt.preventDefault();
  refreshText();
});