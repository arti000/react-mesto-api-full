import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          type="url"
          name="avatar"
          className="popup__input popup__input_type_subtitle"
          placeholder="Ссылка на фото профиля"
          ref={avatarRef}
          required
        />
        <span className="popup__input-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
