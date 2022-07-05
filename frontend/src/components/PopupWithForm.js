function PopupWithForm(props) {
  return (
    <article
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          aria-label="Закрыть попап"
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          className="popup__content"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
