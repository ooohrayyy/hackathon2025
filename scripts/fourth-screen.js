const previousPage = 'third-screen.html';
const popup = document.querySelector('.done');
const doneButton = document.querySelector('.button_type_next');
const nextMove = popup.querySelector('.button');
const generateRhymes = document.querySelector('.button_type_refresh');

function openPopup() {
  popup.classList.add('done_visible');
}

function saveText () {
  const initiativeText = document.querySelector('.form__input_type_textarea').value;
  localStorage.initiative_text = initiativeText;
}

doneButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  saveText();
  openPopup();
});

nextMove.addEventListener('click', (evt) => {
  evt.preventDefault();
  window.open('fresh-initiative.html', '_self', false);
});

generateRhymes.addEventListener('click', (evt) => {
  evt.preventDefault();
  alert('Пока генерировать обращения нельзя');
});