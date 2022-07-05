import React from "react";

function Login({ handleLogin }) {
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
    handleLogin({ email: userEmail, password: userPassword });
    setUserEmail("");
    setUserPassword("");
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <section className="auth__section">
          <h3 className="auth__title">Вход</h3>
          <input
            className="auth__input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleUserEmailChange}
            value={userEmail}
            required
          />
          <input
            className="auth__input"
            name="password"
            type="password"
            placeholder="Пароль"
            onChange={handleUserPasswordChange}
            value={userPassword}
            required
          />
        </section>
        <button className="auth__submit-btn" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
