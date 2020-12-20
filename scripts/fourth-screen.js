const previousPage = 'third-screen.html';
const popup = document.querySelector('.done');
const doneButton = document.querySelector('.button_type_next');
const nextMove = popup.querySelector('.button');
const generateRhymes = document.querySelector('.button_type_refresh');

function openPopup() {
  popup.classList.add('done_visible');
}

doneButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  openPopup();
});

nextMove.addEventListener('click', (evt) => {
  evt.preventDefault();
  window.open('initiative.html', '_self', false);
});

generateRhymes.addEventListener('click', (evt) => {
  evt.preventDefault();
  alert('Пока генерировать обращения нельзя');
});