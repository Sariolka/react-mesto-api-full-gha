import React from "react";
import PopupWithForm from "./PopupWithForm";
import useValidation from "../hooks/useValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const {
    formValues,
    handleChange,
    showErrors,
    isValid,
    resetValidation,
  } = useValidation({});

  React.useEffect(() => {
    resetValidation();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(formValues);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonTitle={isLoading? 'Добавление...' : 'Создать'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      isDisabled={!isValid}
    >
      <label className="popup__fieldset">
        <input
          id="name"
          type="text"
          name="name"
          className={`popup__input popup__input_form_place ${
            showErrors.name && "popup__input_type_error"
          }`}
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          value={formValues.name || ""}
          onChange={handleChange}
        />
        <span className="place-error popup__error popup__error-place popup__error_visible">
          {showErrors.name}
        </span>
        <input
          id="link"
          type="url"
          className={`popup__input popup__input_form_link ${
            showErrors.link && "popup__input_type_error"
          }`}
          name="link"
          required
          placeholder="Ссылка на картинку"
          onChange={handleChange}
          value={formValues.link || ""}
        />
        <span className="link-error popup__error popup__error-link popup__error_visible">
          {showErrors.link}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
