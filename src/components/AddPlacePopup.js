import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  function handleNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handleLinkChange(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: placeName,
      link: placeLink
    });
  }

  return (
    <PopupWithForm name='card' title='Новое место' buttonText='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
      <input
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_element_title"
        id="title-input"
        value={placeName}
        onChange={handleNameChange}
      />
      <span className="popup__error title-input-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        className="popup__input popup__input_element_link"
        id="link-input"
        value={placeLink}
        onChange={handleLinkChange}
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
