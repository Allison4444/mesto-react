import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({onEditProfile, onAddPlace , onEditAvatar, onCardClick}) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription ] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      api.getInfo(),
      api.getInitialCards()
    ])
      .then(([userData, initialCards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(initialCards)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <main className="content">
      <section className="profile content__profile">
        <button className="profile__button-edit-avatar" onClick={onEditAvatar}>
          <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <div className="profile__info-row">
            <h1 className="profile__info-row-name">{userName}</h1>
            <button type="button" className="profile__info-row-edit-button"
              aria-label="Кнопка редактирования профиля" onClick={onEditProfile}></button>
          </div>
          <p className="profile__info-job">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="Кнопка добавления карточек" onClick={onAddPlace}></button>
      </section>
      <section className="elements content__elements" aria-label="Карточки достопримечательностей">
        {cards.map((card) => (
          <Card card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
