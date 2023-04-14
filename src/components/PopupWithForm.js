function PopupWithForm({name, title, buttonText, children, isOpen, onClose}) {
  return (
    <div className={`popup page__popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form name={`${name}`} className="popup__form popup__form-card" noValidate>
          <h2 className="popup__header">{title}</h2>
          {children}
          <button type="submit" className="popup__save-button">{buttonText || 'Сохранить'}</button>
          <button type="button" className={`popup__close-button popup__close-button_type_${name}`} aria-label="Кнопка закрытия" onClick={onClose}></button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;

