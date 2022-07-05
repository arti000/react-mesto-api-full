import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, props.isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          type="text"
          name="name"
          className="popup__input popup__input_type_title"
          placeholder="Имя профиля"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__input-error"></span>
      </section>
      <section className="popup__section">
        <input
          type="text"
          name="about"
          className="popup__input popup__input_type_subtitle"
          placeholder="Описание"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
