function Card({card, currentUser, onCardClick, onCardLike, onCardDelete}) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUser._id;

  let isLiked = card.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__caption-like ${isLiked ? 'element__caption-like_active' : ''}`
  )

  return (
    <article className="element">
      <img src={card.link} alt={card.name} className="element__photo" onClick={handleClick}/>
      {isOwn && <button type="button" className="element__garbage-icon" aria-label="Кнопка удаления карточки" onClick={handleDeleteClick}></button>}
      <div className="element__caption">
        <h2 className="element__caption-title">{card.name}</h2>
        <div className="element__caption-like-group">
          <button type="button" className={cardLikeButtonClassName} aria-label="Кнопка лайка" onClick={handleLikeClick} ></button>
          <span className="element__caption-like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;
