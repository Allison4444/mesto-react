import { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({card, isOpen, onClose, onConfirmDelete}) {
  const [buttonText, setButtonText] = useState('Да');

  useEffect(() => {
    setButtonText('Да');
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();

    setButtonText('Удаление...')

    onConfirmDelete(card);
  }

  return (
    <PopupWithForm name='delete' title='Вы уверены?' buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} ></PopupWithForm>
  )
}

export default ConfirmPopup;
