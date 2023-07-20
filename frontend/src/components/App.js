import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import InfoTooltip from "./InfoTooltip.js";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Preloader from "./Preloader.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isOpenCardPopupOpen, setIsOpenCardPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardForDelete, setCardForDelete] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    setLoading(true);
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
        console.log(cards);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((c) => c._id === currentUser._id);
    api
      .changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(value) {
    setIsLoading(true);
    api
      .editUserProfile(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(value) {
    setIsLoading(true);
    api
      .changeAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(value) {
    setIsLoading(true);
    api
      .addNewCard(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  }

  function handleLogin(password, email) {
    setLoading(true);
    auth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setEmail(email);
          console.log(email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
      })
      .finally(() => setLoading(false));
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  function handleTokenCheck() {
    setLoading(true);
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setIsInfoTooltipPopupOpen(false);
            setLoggedIn(true);
            console.log(res.data.email);
            setEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setIsOpenCardPopupOpen(true);
    setSelectedCard(card);
  };
  const handleOpenCardDeletePopup = (card) => {
    setIsDeleteCardPopupOpen(true);
    setCardForDelete(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsOpenCardPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={onSignOut} loggedIn={loggedIn} />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              loading ? (
                <Preloader loading={loading} />
              ) : (
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onClose={closeAllPopups}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleOpenCardDeletePopup}
                  cards={cards}
                />
              )
            }
          />
          <Route
            path="*"
            element={
              !loggedIn ? <Navigate to="/sign-up" /> : <Navigate to="/" />
            }
          />
        </Routes>

        {loggedIn && <Footer />}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isOpenCardPopupOpen}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={cardForDelete}
          isLoading={isLoading}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
