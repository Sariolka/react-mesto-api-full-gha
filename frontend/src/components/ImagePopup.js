import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, onClose, isOpen }) {
  usePopupClose(isOpen, onClose);
  return (
    <div
      className={`popup popup_type_photo-full ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container-photo">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__button-close"
          onClick={onClose}
        />
        <img className="popup__photo-open" src={card.link} alt={card.name} />
        <p className="popup__photo-title"> {card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
