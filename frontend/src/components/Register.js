import React from "react";
import { Link } from "react-router-dom";

function Register({ userRegistration }) {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  function handleUserEmailChange(evt) {
    setUserEmail(evt.target.value);
  }

  function handleUserPasswordChange(evt) {
    setUserPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    userRegistration({ email: userEmail, password: userPassword });
    setUserEmail("");
    setUserPassword("");
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <section className="auth__section">
          <h3 className="auth__title">Регистрация</h3>
          <input
            type="email"
            name="email"
            className="auth__input"
            placeholder="Email"
            onChange={handleUserEmailChange}
            value={userEmail}
            required
          />
          <input
            type="password"
            name="password"
            className="auth__input"
            placeholder="Пароль"
            onChange={handleUserPasswordChange}
            value={userPassword}
            required
          />
        </section>
        <button className="auth__submit-btn" type="submit">
          Зарегистрироваться
        </button>
        <p className="auth__text">
          Уже зарегистрированы?{" "}
          <Link className="auth__link" to="/signin">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
