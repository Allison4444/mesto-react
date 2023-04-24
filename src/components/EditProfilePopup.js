import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() =>{
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_element_name"
        id="name-input"
        value={name}
        onChange={handleNameChange} />
      <span className="popup__error name-input-error"></span>
      <input
        type="text"
        name="about"
        placeholder="Ваш род деятельности"
        required
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_element_job"
        id="job-input"
        value={description}
        onChange={handleDescriptionChange} />
      <span className="popup__error job-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
