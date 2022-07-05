import React from "react";
import positiveIcon from "../images/positive.svg";
import negativeIcon from "../images/negative.svg";

function InfoTooltip({ isOpen, onClose, userStatus }) {
  return (
    <article className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          aria-label="Закрыть попап"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__content">
          <img
            className="popup__icon"
            src={userStatus ? positiveIcon : negativeIcon}
            alt="Иконка ответа"
          />
          <p className="popup__message">
            {userStatus
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </article>
  );
}

export default InfoTooltip;
