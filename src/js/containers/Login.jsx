import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {string, func, object} from 'prop-types';


const Login = ({email, changeInput, login, errors, history}) => {
  const handleChangeInput = e => changeInput(e.currentTarget.type, e.currentTarget.value);
  const handleSubmitLogin = e => {
    login(e)
      .then(c => c === 200 ? history.push(`/dashboard`) : ``);
  };

  return (
    <main className='login-container'>
      <h1 className='poppins-bol green-color heading'>Inloggen</h1>

      <form method='POST' onSubmit={handleSubmitLogin} className='login-form'>

        <section className='label-container'>
          <label htmlFor='email' className='lato-bol light-grey-color'>E-mailadres:</label>
          <label htmlFor='password' className='lato-bol light-grey-color'>Wachtwoord:</label>
        </section>

        <section className='input-fields'>
          <div className='input-field'>
            <input className='grey-color' name='email' id='email' onChange={handleChangeInput} value={email} type='email' placeholder='example@budamunt.be' />
            <p className='error'>{errors.email}</p>
          </div>

          <div>
            <input className='grey-color' id='password' name='password' onChange={handleChangeInput} type='password' placeholder='••••••••' />
            <p className='error'>{errors.password}</p>
          </div>

          <input className='grey-color' type='submit' value='Login' />

          <p className='lato-reg info-register'>Heeft u nog geen account? <Link to={`/`} className='blue-link'>Registreer hier!</Link></p>
        </section>

      </form>
    </main>
  );
};

Login.propTypes = {
  email: string.isRequired,
  changeInput: func.isRequired,
  login: func.isRequired,
  errors: object.isRequired,
  history: object.isRequired
};

export default inject(
  ({userStore}) => ({
    email: userStore.email,
    changeInput: userStore.changeInput,
    login: userStore.login,
    errors: userStore.errors
  })
)(
  observer(Login)
);
