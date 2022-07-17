import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../context/appContext';
import './Login.css';
import validationLogin from '../services/validacaoLogin';

function Login() {
  const { user } = useContext(appContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const history = useHistory();

  function onHandleLogin() {
    user.set({ email, senha });

    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    history.push('/foods');
  }

  useEffect(() => {
    setBtnDisabled(validationLogin(email, senha));
  }, [email, senha]);

  return (
    <>
      <div className="logo-image" />
      <div className="bg-login">
        <div className="card-login">
          <label htmlFor="email">
            Email
            <input
              className="form-control"
              placeholder="exemplo@exemplo.com"
              id="email"
              type="text"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
              data-testid="email-input"
            />
          </label>

          <label htmlFor="senha">
            Senha
            <input
              className="form-control"
              placeholder="Senha"
              id="senha"
              type="password"
              value={ senha }
              onChange={ ({ target: { value } }) => setSenha(value) }
              data-testid="password-input"
            />
          </label>

          <button
            className="btn"
            type="button"
            onClick={ onHandleLogin }
            disabled={ btnDisabled }
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
