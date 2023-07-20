import { useForm } from "../hooks/useForm";

function Login({ onLogin }) {
  const { formValue, handleChange } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    const { password, email } = formValue;
    onLogin(password, email);
  }

  return (
    <div className="auth">
      <p className="auth__title">Вход</p>
      <form
        className="auth__form"
        name="login"
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
