function ImagePopup(props) {
  return (
    <article
      className={`popup image-popup ${props.card ? "popup_opened" : ""}`}
    >
      <div className="preview">
        <button
          className="popup__close"
          aria-label="Закрыть попап"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="preview__image">
          <img
            src={props.card?.link}
            alt={props.card?.name}
            className="popup__image"
          />
        </div>
        <p className="popup__title image-popup__title">
          {props.card ? props.card.name : "#"}
        </p>
      </div>
    </article>
  );
}

export default ImagePopup;
