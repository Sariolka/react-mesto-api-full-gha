import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonTitle={isLoading? 'Сохранение...' : 'Сохранить'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__fieldset">
        <input
          id="avatar"
          type="url"
          name="avatar"
          className="popup__input popup__input_form_avatar"
          placeholder="Ссылка на изображение"
          required
          ref={avatarRef}
        />
        <span className="avatar-error popup__error popup__error-avatar popup__error_visible"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
