import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { auth } from "../utils/Authentification";

function App() {
  //Все, что касается пользователя
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [userAuth, setUserAuth] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser({name: res.user.name, about: res.user.about, avatar: res.user.avatar, _id: res.user._id});
        })
        .catch((err) => console.log(err));
      api
        .getInitialCards()
        .then((data) => {
          setCards(data.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  //Все, что касается попапов
  const [selectedCard, setSelectedCard] = React.useState();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpening] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpening] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpening] =
    React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [userStatus, setUserStatus] = React.useState();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpening(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpening(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpening(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpening(false);
    setIsEditProfilePopupOpening(false);
    setIsAddPlacePopupOpening(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  //Все что касается частных функций попапов
  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar({ avatar })
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //Все, что касается карточек
  const [cards, setCards] = React.useState([]);
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //Регистрация пользователя
  function userRegistration({ email, password }) {
    auth
      .registration(email, password)
      .then(() => {
        navigate("/signin");
        setUserStatus(true);
      })
      .catch(() => {
        setUserStatus(false);
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  function userSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin");
  }

  function handleLogin({ email, password }) {
    auth
      .handleLogin(email, password)
      .then((userData) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", userData.token);
        return userData;
      })
      .then((data) => {
        navigate("/");
        setUserEmail(data.email);
      })
      .catch((err) => console.log(err));
  }

  //Проверка авторизованности пользователя
  React.useEffect(() => {
    const userToken = localStorage.getItem('jwt');
    if (userToken) {
      //Здесь мы включаем лоадер
      setUserAuth(true);
      auth
        .checkToken(userToken)
        .then((userData) => {
          navigate("/");
          setLoggedIn(true);
          setUserEmail(userData.data.email);
        })
        .catch((err) => console.log(err))
        //А здесь мы выключаем лоадер после успешной загрузки контента
        .finally(() => setUserAuth(false));
    } else {
      setUserAuth(false);
    }
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header userEmail={userEmail} userSignOut={userSignOut} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoute loggedIn={loggedIn} userAuth={userAuth}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  cards={cards}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                />
                <PopupWithForm
                  name="confirmation"
                  title="Вы уверены?"
                  buttonText="Да"
                  isOpen={false}
                  onClose={closeAllPopups}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <>
                  <Register userRegistration={userRegistration} />
                  <InfoTooltip
                    userStatus={userStatus}
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                  />
                </>
              )
            }
          ></Route>
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <>
                  <Login handleLogin={handleLogin} />
                  <InfoTooltip
                    userStatus={userStatus}
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                  />
                </>
              )
            }
          ></Route>
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
