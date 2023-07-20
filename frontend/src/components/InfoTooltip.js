import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";
import success from "../images/success.svg";
import unSuccess from "../images/unSuccess.svg";

function InfoTooltip({ onClose, isOpen, isSuccess }) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container-tooltip">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__button-close"
          onClick={onClose}
        />
        <img
          className="popup__tooltip-pic"
          alt="Иконка статуса регистрации"
          src={isSuccess ? success : unSuccess}
        />
        <p className="popup__tooltip-title">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : `Что-то пошло не так!
Попробуйте ещё раз.`}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
