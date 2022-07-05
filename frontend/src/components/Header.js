import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header({userEmail, userSignOut}) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function singOut() {
    userSignOut();
    setMenuOpen(false);
  }

  return (
    <header className={`header ${menuOpen ? "header_open-menu" : ""}`}>
        <Link className="header__logo" to="/#" target="_blank"></Link>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <button
                  className={`header__icon-menu ${
                    menuOpen ? "header__icon-menu_open" : ""
                  }`}
                  onClick={toggleMenu}
                ></button>
                <div
                  className={`header__menu  ${
                    menuOpen ? "header__menu_open" : ""
                  }`}
                >
                  <p className="header__email">{userEmail}</p>
                  <button className="header__logout" onClick={singOut}>Выйти</button>
                </div>
              </>
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <Link className="header__link" to="/signup">
                Регистрация
              </Link>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Link className="header__link" to="/signin">
                Войти
              </Link>
            }
          ></Route>
        </Routes>
    </header>
  );
}

export default Header;
