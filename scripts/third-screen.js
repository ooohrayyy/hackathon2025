// * Объявляем переменные

const headerLinks = document.querySelectorAll('.header__link'); // Ссылки в хэдере
const nextButtons = document.querySelectorAll('.button_type_next'); // Кнопки «Дальше»
const backButtons = document.querySelectorAll('.button_type_back'); // Кнопки «Назад»
const socialButtons = document.querySelectorAll('.footer__link'); // Кнопки соцсетей в футере

const categoryButtons = document.querySelectorAll('.category'); // Кнопки подкатегорий
const subcategories = document.querySelectorAll('.category__name'); // Названия подкатегорий
const categoryName = localStorage.category; // Выбранная категория

const imageButton = document.querySelector('.form__photo-button'); // Кнопка выбора изображения
const imagePreview = document.querySelector('.form__photo-label'); // Адрес превью иллюстрации

const previousPage = 'second-screen.html'; // Следующая страница
const nextPage = 'fourth-screen.html'; // Предыдущая страница

// * Объявляем функции

function getSubcategories (category) { // Рендеринг подкатегории в зависимости от выбранной категории
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

function getPicture () { // Получение ссылки на иллюстрацию
  const result = prompt('Введите ссылку на иллюстрацию');
  return result;
}

function setImagePreview (src) { // Добавление превью иллюстрации
  imagePreview.src = src;
}

function validationAlert () { // Предупреждение валидации
  alert('Пожалуйста, выберите подкатегорию');
}

// * Вызываем функции

getSubcategories(categoryName);

// * Вешаем слушатели событий

headerLinks.forEach((link) => { // Алерты на ссылки в хэдере
  link.addEventListener('click', () => {
    alert('Эти ссылки пока не работают');
  });
});

categoryButtons.forEach((button) => { // Логика кнопок подкатегорий
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

imageButton.addEventListener('click', (evt) => { // Логика загрузки иллюстрации
  evt.preventDefault();

  const imageSource = getPicture();

  localStorage.initiative_image = imageSource;
  setImagePreview(imageSource);
});

nextButtons.forEach((button) => { // Переход на следующую страницу
  button.addEventListener('click', (evt) => {
    evt.preventDefault();

    const activeCategory = document.querySelector('.category_active');

    if (activeCategory) {
      window.open(nextPage, '_self', false);
    } else {
      validationAlert();
    }
  });
});

backButtons.forEach((button) => { // Переход на страницу назад
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.open(previousPage, '_self', false);
  });
});

socialButtons.forEach((button) => { // Алерты на кнопках соцсетей в футере
  button.addEventListener('click', () => {
    alert('Тут будет переход на соцсети');
  });
});