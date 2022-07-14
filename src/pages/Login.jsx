import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../context/appContext';

const INITIAL_STATE_TOKENS = {
  mealsToken: 1,
  cocktailsToken: 1,
};

function Login() {
  const { user } = useContext(appContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [tokens] = useState(INITIAL_STATE_TOKENS);

  const history = useHistory();

  function onHandleLogin() {
    const userInfor = {
      email,
      senha,
      mealsToken: tokens.mealsToken,
      cocktailsToken: tokens.cocktailsToken,
    };
    user.set(userInfor);
    localStorage.setItem('user', JSON.stringify(userInfor));
    history.push('/foods');
  }

  useEffect(() => {
    const EMAIL_VALI = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/img;
    const MIN_PASSWORD = 6;
    if (EMAIL_VALI.test(email) && senha.length > MIN_PASSWORD) {
      setBtnDisabled(false);
    } else if (!btnDisabled) setBtnDisabled(true);
  }, [email, senha]);

  return (
    <>
      <label htmlFor="email">
        <input
          id="email"
          type="text"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="senha">
        <input
          id="senha"
          type="password"
          value={ senha }
          onChange={ ({ target: { value } }) => setSenha(value) }
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        onClick={ onHandleLogin }
        disabled={ btnDisabled }
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </>
  );
}

export default Login;
