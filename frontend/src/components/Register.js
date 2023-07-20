import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

function Register({ onRegister }) {
  const { formValue, handleChange } = useForm({});
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    onRegister(password, email);
  };

  return (
    <div className="auth">
      <p className="auth__title">Регистрация</p>
      <form
        className="auth__form"
        name="registration"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          id="email"
          type="email"
          name="email"
          className="auth__input"
          placeholder="Email"
          required
          onChange={handleChange}
          value={formValue.email || ""}
        />
        <input
          id="password"
          type="password"
          name="password"
          className="auth__input"
          placeholder="Пароль"
          required
          onChange={handleChange}
          value={formValue.password || ""}
        />
        <button type="submit" className="auth__button-submit">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="auth__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
