// * Объявляем переменные

const previousPage = 'second-screen.html';
const nextPage = 'fourth-screen.html';
const categoryButtons = document.querySelectorAll('.category');
const subcategories = document.querySelectorAll('.category__name');
const categoryName = localStorage.category;

// * Объявляем функции

function getSubcategories (category) {
  switch (category) {
    case 'Образование':
      subcategories[0].textContent = 'Школа';
      subcategories[1].textContent = 'Университет';
      subcategories[2].textContent = 'Программа';
      break;
    case 'Здоровье':
      subcategories[0].textContent = 'Медицина';
      subcategories[1].textContent = 'Питание';
      subcategories[2].textContent = 'Жизнь';
      break;
    case 'Экология':
      subcategories[0].textContent = 'Природа';
      subcategories[1].textContent = 'Отходы';
      subcategories[2].textContent = 'Город';
      break;
    case 'Право':
      subcategories[0].textContent = 'Законодательство';
      subcategories[1].textContent = 'Конституция';
      subcategories[2].textContent = 'Права человека';
      break;
    case 'Общество':
      subcategories[0].textContent = 'Благоустройство';
      subcategories[1].textContent = 'Безопасность';
      subcategories[2].textContent = 'Проблемы';
      break;
    case 'Государство':
      subcategories[0].textContent = 'Благоустройство';
      subcategories[1].textContent = 'Безопасность';
      subcategories[2].textContent = 'Проблемы';
      break;
    default:
      subcategories[0].textContent = 'Ошибка';
      subcategories[1].textContent = 'Ошибка';
      subcategories[2].textContent = 'Ошибка';
  }
}

// * Вызываем функции

getSubcategories(categoryName);

// * Вешаем слушатели событий

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