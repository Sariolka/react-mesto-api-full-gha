import React from "react";
import logo from "../images/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, onSignOut, loggedIn }) {
  const [isOpenInfo, setIsOpenInfo] = React.useState(false);

  function openInfo() {
    setIsOpenInfo(!isOpenInfo);
  }
  function signOut() {
    setIsOpenInfo(false);
    onSignOut();
  }

  return (
    <header
      className={
        !isOpenInfo
          ? "header header__mobile-signout"
          : "header header__open-menu"
      }
    >
      <div className="header__container">
        <img src={logo} alt="Логотип сайта" className="header__logo" />
        <button
          className={`${
            !isOpenInfo
              ? "header__button-burger"
              : `header__button-burger header__button-close`
          } ${!loggedIn && `header__button-burger_hidden`} `}
          onClick={openInfo}
        ></button>
      </div>
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className={!loggedIn && "header__link"}>
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className={`${!loggedIn && `header__link`}`}>
              Регистрация
            </Link>
          }
        />
        <Route
          exact
          path="/"
          element={
            <div
              className={
                !isOpenInfo
                  ? "header__login"
                  : `header__login header__login-mobile`
              }
            >
              <p className="header__email">{email}</p>
              <button
                className="header__button"
                onClick={signOut}
                aria-label="Выйти"
              >
                Выйти
              </button>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
