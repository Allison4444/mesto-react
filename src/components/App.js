import {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCardForImage, setSelectedCardForImage] = useState(null);
  const [selectedCardForDelete, setSelectedCardForDelete] = useState(null);

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

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCardForDelete(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCardForImage(null);
    setSelectedCardForDelete(null);
  }

  function handleCardClick(card) {
    setSelectedCardForImage(card);
  }

  function handleCardLike(card) {
     const isLiked = card.likes.some(i => i._id === currentUser._id);

     api.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(state => state.filter(с => с._id !== card._id)))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
  }

  function handleUpdateUser(data) {
    api.editProfile(data)
      .then(res => {
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data.avatar)
      .then(res => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then(newCard => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ConfirmPopup card={selectedCardForDelete} isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onConfirmDelete={handleCardDelete} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCardForImage} onClose={closeAllPopups}></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
