import useClosePopupOnKeydown from "../hooks/useClosePopupOnKeydown";

function ImagePopup({ card, onClose }) {
  useClosePopupOnKeydown({ isOpen: card, onClose });

  return (
    <div className={`popup page__popup-photo ${card !== null ? 'popup_opened' : ''}`} onClick={e => e.target.classList.contains('popup') && onClose()}>
      <div className="popup__photo-container">
        <button type="button" className="popup__close-button popup__close-button_type_photo" aria-label="Кнопка закрытия" onClick={onClose}></button>
        <figure className="popup__figure">
          <img src={card?.link} alt={card?.name} className="popup__photo" />
          <figcaption className="popup__figcaption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
