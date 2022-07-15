function validationLogin(email, senha) {
  const EMAIL_VALI = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/img;
  const MIN_PASSWORD = 6;
  return !(EMAIL_VALI.test(email) && senha.length > MIN_PASSWORD);
}

export default validationLogin;
