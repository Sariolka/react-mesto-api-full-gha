import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button
            type="button"
            aria-label="Изменить аватар"
            className="profile__avatar-button"
            onClick={onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar"
            />
          </button>
          <div className="profile__container">
            <h1 className="profile__name"> {currentUser.name} </h1>
            <button
              type="button"
              aria-label="Изменить данные профиля"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
            <p className="profile__description"> {currentUser.about} </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Создать карточку с фотографией"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements" aria-label="Природа России">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              onCardClick={onCardClick}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
