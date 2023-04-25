import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({card, isOpen, onClose, onConfirmDelete}) {
  function handleSubmit(e) {
    e.preventDefault();

    onConfirmDelete(card);
  }

  return (
    <PopupWithForm name='delete' title='Вы уверены?' buttonText='Да' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} ></PopupWithForm>
  )
}

export default ConfirmPopup;
