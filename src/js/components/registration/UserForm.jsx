import React from 'react';
import {Link} from 'react-router-dom';
import {isEmpty} from 'lodash';
import {inject, observer} from 'mobx-react';
import {func, object, string} from 'prop-types';

const UserForm = ({history, subscriptionType, handleChangeInput, data, errors, validateForm}) => {
  const URLNumber = subscriptionType.includes(`bewoner`) ? 2 : 3;

  const handleValidateForm = e => {
    e.preventDefault();
    validateForm(document.querySelector(`.registration-form`)) === 200 ? history.push(`/inschrijven/step-${URLNumber}`) : null;
  };

  return (
    <form method='POST' className='registration-form fixed-width'>

      <section className='label-container'>
        <label htmlFor='name' className='lato-bol light-grey-color'>Naam:</label>
        <label htmlFor='firstName' className='lato-bol light-grey-color'>Voornaam:</label>
        <label htmlFor='email' className='lato-bol light-grey-color'>E-mailadres:</label>
        <label htmlFor='phone' className='lato-bol light-grey-color'>Gsm-Nummer:</label>
        <label htmlFor='password' className='lato-bol light-grey-color'>Wachtwoord:</label>
      </section>

      <section className='input-fields'>

        <article className='input-data'>
          <div className='input-text'>

            <div className='input-field'>
              <input className='grey-color' name='name' id='name' type='name' placeholder='John' value={data.name} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.name : null}</p>
            </div>

            <div className='input-field'>
              <input className='grey-color' id='firstName' name='firstName' type='text' placeholder='Doe' value={data.firstName} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.firstName : null}</p>
            </div>

            <div className='input-field'>
              <input className='grey-color' id='email' name='email' type='email' placeholder='example@budamunt.be' value={data.email} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.email : null}</p>
            </div>

            <div className='input-field'>
              <input className='grey-color' id='phone' name='phone' type='text' placeholder='0123 456 789' value={data.phone} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.phone : null}</p>
            </div>

            <div className='input-field'>
              <input className='grey-color' id='password' name='password' type='password' placeholder='••••••••' onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.password : null}</p>
            </div>
          </div>

          <div className={URLNumber >= 3 ? `noAccess` : `avatar`}>
            <img width='75%' src={data.fileURL} alt='avatar preview' />
            <label htmlFor='file' className='green-button-link lato-bol'>Upload Profielfoto</label>
            <input id='file' name='file' type='file' accept='image/*' onChange={handleChangeInput} />
            <p className='error'>{!isEmpty(errors) ? errors.file : null}</p>
          </div>

        </article>

        <p className='do-next-bar'>
          <Link to={URLNumber >= 3 ? `/inschrijven/step-${URLNumber - 2}` : `/inschrijven`} className='green-button-link lato-bol'>Terug</Link>
          <span className='line'></span>
          <a href='#'  onClick={handleValidateForm} className='blue-button-link lato-bol'>Verder</a>
        </p>

        <p className='grey-color'>Heeft u al een account? <Link to={`/login`} className='blue-link'>Log u hier in!</Link></p>
      </section>

    </form>
  );

};
UserForm.propTypes = {
  handleChangeInput: func.isRequired,
  data: object.isRequired,
  subscriptionType: string.isRequired,
  errors: object.isRequired,
  validateForm: func.isRequired,
  history: object.isRequired
};

export default inject(
  ({registrationStore}) => ({
    data: registrationStore.data,
    validateForm: registrationStore.validateForm,
    errors: registrationStore.errors
  })
)(
  observer(UserForm)
);
