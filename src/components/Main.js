import {useContext} from "react";
import Card from "./Card";
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardsContext from '../contexts/CardsContext';

function Main({onEditProfile, onAddPlace , onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardsContext);

  return (
    <main className="content">
      <section className="profile content__profile">
        <button className="profile__button-edit-avatar" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <div className="profile__info-row">
            <h1 className="profile__info-row-name">{currentUser.name}</h1>
            <button type="button" className="profile__info-row-edit-button"
              aria-label="Кнопка редактирования профиля" onClick={onEditProfile}></button>
          </div>
          <p className="profile__info-job">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="Кнопка добавления карточек" onClick={onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Карточки достопримечательностей">
        <ul className="elements__list">
          {cards.map((card) => (
            <li className="elements__list-item" key={card._id}>
              <Card card={card} currentUser={currentUser} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
