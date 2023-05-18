import useClosePopupOnKeydown from "../hooks/useClosePopupOnKeydown";

function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
  useClosePopupOnKeydown({ isOpen, onClose });

  return (
    <div className={`popup page__popup-${name} ${isOpen ? 'popup_opened' : ''}`} onClick={e => e.target.classList.contains('popup') && onClose()} >
      <div className="popup__container">
        <form name={`${name}`} className="popup__form popup__form-card" onSubmit={onSubmit}>
          <h2 className="popup__header">{title}</h2>
          {children}
          <button type="submit" className="popup__save-button">{buttonText}</button>
          <button type="button" className={`popup__close-button popup__close-button_type_${name}`} aria-label="Кнопка закрытия" onClick={onClose}></button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;

