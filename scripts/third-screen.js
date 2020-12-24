const previousPage = 'second-screen.html';
const nextPage = 'fourth-screen.html';

// * Логика кнопок выбора подкатегории

const categoryButtons = document.querySelectorAll('.category');

categoryButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();

    const buttonsArray = Array.from(categoryButtons);
    const otherButtons = buttonsArray.filter(button => !(button === evt.target));

    otherButtons.forEach(button => {
      button.classList.remove('category_active');
    });

    const buttonValue = button.querySelector('.category__name').textContent;
    localStorage.subcategory = buttonValue;
    button.classList.toggle('category_active');
  });
});