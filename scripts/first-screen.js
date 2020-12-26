// * Объявляем переменные

const previousPage = 'index.html';
const nextPage = 'second-screen.html';
const nextButton = document.querySelector('.button_type_next');
const formElement = document.querySelector('.form')
const inputElement = formElement.querySelectorAll('.form__input')

// * Объявляем функции
console.log(inputElement)
function saveUserData () {
  const initiativeName = document.querySelector('#initiative_name').value;
  const userName = document.querySelector('#initiative_username').value;
  const userMail = document.querySelector('#initiative_usermail').value;

  localStorage.initiative_name = initiativeName;
  localStorage.initiative_username = userName;
  localStorage.initiative_usermail = userMail;
}

const showInputError = () => {
  inputElement.classlist.add('.form__input_error_visible')
}

const hideInputError = () => {
  inputElement.classlist.remove('.form__input_error_visible')
}

const isValid = () => {
  if(!formElement.validity.valid) {
    showInputError()
  } else {
    hideInputError()
  }
};

const addActiveButtonState  = () => {
  nextButton.classlist.add('button_type_inactive')
  nextButton.diabled = true
};

const removeActiveButtonState = () => {
  nextButton.classlist.remove('button_type_inactive')
  nextButton.diabled = false
}

const hasInvalidInput = (item) => {
return item.some((inputElement) => {
  return !inputElement.validity.valid
})
}

const toggleButtonState  = () => {
  if(hasInvalidInput(inputElement)) {
    addActiveButtonState()
  } else {
    removeActiveButtonState()
  }
}
 
const setEventListener = () => {
  inputElement.forEach((item) => {
    item.addEventListener('input', () => {
isValid(inputElement, formElement);
toggleButtonState( )
    })
  })
};

const enadleValidation = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault()
  });
  setEventListener()
}

enadleValidation()

// * Вешаем слушатели событий
formElement.addEventListener('input', isValid)
nextButton.addEventListener('click', saveUserData);