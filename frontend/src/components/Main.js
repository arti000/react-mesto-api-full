import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__photo-container">
          <button
            className="profile__edit-photo-btn"
            onClick={props.onEditAvatar}
          ></button>
          <img
            src={currentUser?.avatar}
            alt="Фото"
            className="profile__photo"
          />
        </div>
        <div className="profile__content">
          <div className="profile__info">
            <h1 className="profile__title">{currentUser?.name}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__open-popup"
              aria-label="Открыть попап"
              type="button"
            ></button>
            <p className="profile__subtitle">{currentUser?.about}</p>
          </div>
          <button
            onClick={props.onAddPlace}
            className="profile__add-button"
            aria-label="Добавить карточку"
            type="button"
          ></button>
        </div>
      </section>
      <section className="gallery">
        <ul className="cards">
          {props.cards.map((card) => (
            <Card
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
              onCardClick={props.onCardClick}
              card={card}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
