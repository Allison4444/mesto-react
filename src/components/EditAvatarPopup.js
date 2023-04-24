import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });

    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
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
