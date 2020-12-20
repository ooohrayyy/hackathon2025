const headerLinks = document.querySelectorAll('.header__link');
const nextButtons = document.querySelectorAll('.button_type_next');
const backButtons = document.querySelectorAll('.button_type_back');
const socialButtons = document.querySelectorAll('.footer__link');

headerLinks.forEach((link) => {
  link.addEventListener('click', () => {
    alert('Эти ссылки пока не работают');
  });
});

nextButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.open(nextPage, '_self', false);
  });
});

backButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.open(previousPage, '_self', false);
  });
});

socialButtons.forEach((button) => {
  button.addEventListener('click', () => {
    alert('Тут будет переход на соцсети');
  });
});