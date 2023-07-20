import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleCardClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((card) => card._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__delete"
          aria-label="Удалить карточку с фотографией"
          onClick={handleDeleteClick}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className="card__photo"
        onClick={handleCardClick}
      />
      <div className="card__footer">
        <h2 className="card__title"> {card.name} </h2>
        <div className="card__like-container">
          <button
            type="button"
            aria-label="Поставить лайк"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="card__like-count"> {card.likes.length} </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
