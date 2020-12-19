const commentForm = document.querySelector('.new-comment');
const supportButton = document.querySelector('.button_type_support');
const shareButtons = document.querySelectorAll('.initiative__share-link');
const newCommentButton = document.querySelector('.button_type_comment');
const leaveCommentButton = commentForm.querySelector('.button_type_comment');
const closeFormButton = commentForm.querySelector('.close');
const generateRhymes = commentForm.querySelector('.button_type_refresh');

function openCommentForm() {
  commentForm.classList.add('new-comment_visible');
}

function closeCommentForm(evt) {
  evt.preventDefault();
  commentForm.classList.remove('new-comment_visible');
}

supportButton.addEventListener('click', () => {
  alert('Тут будет новое окно');
});

shareButtons.forEach((button) => {
  button.addEventListener('click', () => {
    alert('Тут будет шеринг в соцсетях');
  });
});

newCommentButton.addEventListener('click', openCommentForm);
leaveCommentButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  alert('Пока оставлять комментарии нельзя');
});
closeFormButton.addEventListener('click', closeCommentForm);
generateRhymes.addEventListener('click', (evt) => {
  evt.preventDefault();
  alert('Пока генерировать комментарии нельзя');
});