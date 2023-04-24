import {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext'
import CardsContext from '../contexts/CardsContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getInfo(),
      api.getInitialCards()
    ])
      .then(([userData, initialCards]) => {
        setCurrentUser({
          ...currentUser,
          ...userData
        })
        setCards([
          ...cards,
          ...initialCards
        ])
      })
      .catch(err => console.log(err))
  }, [])

  // console.log(cards)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
     // Снова проверяем, есть ли уже лайк на этой карточке
     const isLiked = card.likes.some(i => i._id === currentUser._id);

     // Отправляем запрос в API и получаем обновлённые данные карточки
     api.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log(newCard)
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(state => state.filter(с => с._id !== card._id)))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />
          <Footer />
          <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <input type="text" name="name" placeholder="Ваше имя" required minLength="2" maxLength="40"
              className="popup__input popup__input_element_name" id="name-input" />
            <span className="popup__error name-input-error"></span>
            <input type="text" name="about" placeholder="Ваш род деятельности" required minLength="2" maxLength="200"
              className="popup__input popup__input_element_job" id="job-input" />
            <span className="popup__error job-input-error"></span>
          </PopupWithForm>
          <PopupWithForm name='card' title='Новое место' buttonText='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <input type="text" name="name" placeholder="Название" required minLength="2" maxLength="30"
              className="popup__input popup__input_element_title" id="title-input" />
            <span className="popup__error title-input-error"></span>
            <input type="url" name="link" placeholder="Ссылка на картинку" required
              className="popup__input popup__input_element_link" id="link-input" />
            <span className="popup__error link-input-error"></span>
          </PopupWithForm>
          <PopupWithForm name='delete' title='Вы уверены?' buttonText='Да'></PopupWithForm>
          <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <input type="url" name="link" placeholder="Ссылка на фотографию" required
              className="popup__input popup__input_element_link" id="avatar-link-input" />
            <span className="popup__error avatar-link-input-error"></span>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
