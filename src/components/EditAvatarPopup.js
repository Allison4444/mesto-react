import PopupWithForm from './PopupWithForm';
import { useRef, useState, useEffect } from 'react';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const [buttonText, setButtonText] = useState('Сохранить');
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    setButtonText('Сохранение...');

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  useEffect(() => {
    setButtonText('Сохранить');
    avatarRef.current.value = '';
  }, [onClose]);

  return (
    <PopupWithForm name='avatar' title='Обновить аватар' buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
      <input
        type="url"
        name="link"
        placeholder="Ссылка на фотографию"
        required
        className="popup__input popup__input_element_link"
        id="avatar-link-input"
        ref={avatarRef}
      />
      <span className="popup__error avatar-link-input-error"></span>
    </PopupWithForm>
)
}

export default EditAvatarPopup;
