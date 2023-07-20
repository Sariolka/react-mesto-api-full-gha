import React from "react";
import PopupWithForm from "./PopupWithForm";
import { usePopupClose } from "../hooks/usePopupClose";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, card, isLoading }) {
  usePopupClose(isOpen, onClose);
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name="card-delete"
      title="Вы уверены?"
      buttonTitle={isLoading ? "Удаление..." : "Да"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
