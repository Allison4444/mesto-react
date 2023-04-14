function Card({card, onCardClick}) {
  function handleClick() {
    onCardClick(card)
  }

  return (
    <article className="element">
      <img src={card.link} alt="" className="element__photo" onClick={handleClick}/>
      <button type="button" className="element__garbage-icon" aria-label="Кнопка удаления карточки"></button>
      <div className="element__caption">
        <h2 className="element__caption-title">{card.name}</h2>
        <div className="element__caption-like-group">
          <button type="button" className="element__caption-like" aria-label="Кнопка лайка"></button>
          <span className="element__caption-like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;
