import React from 'react';
import {Link} from 'react-router-dom';
import {isEmpty} from 'lodash';
import {func, string, object} from 'prop-types';

const PinForm = ({handleChangeInput, handleSubmitForm, subscriptionType, errors}) => {

  return (
    <form method='POST' onSubmit={handleSubmitForm} className='registration-form large-container'>

      <section className='label-container'>
        <label htmlFor='pin' className='lato-bol light-grey-color'>Pincode:</label>
        <label htmlFor='pin-repeat' className='lato-bol light-grey-color'>Pincode herhalen:</label>
      </section>

      <section className='input-fields'>

        <article className='input-data'>
          <div className='input-text'>

            <div className='input-field'>
              <input className='grey-color' name='pin' id='pin' type='password' inputMode='numeric' maxLength='4' size='4' onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.pin : null}</p>
            </div>

            <div className='input-field'>
              <input className='grey-color' name='pinRepeat' id='pin-repeat' type='password' inputMode='numeric' maxLength='4' size='4' onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.pinRepeat : null}</p>
            </div>

          </div>

        </article>

        <p className='do-next-bar'>
          <Link to={`/inschrijven/step-${subscriptionType.includes(`bewoner`) ? `2` : `3`}`} className='green-button-link lato-bol'>Terug</Link>
          <span className='line'></span>
          <input type='submit' className='blue-button-link lato-bol' value='Registreer' />
        </p>

      </section>

    </form>
  );

};
PinForm.propTypes = {
  handleChangeInput: func.isRequired,
  handleSubmitForm: func.isRequired,
  subscriptionType: string.isRequired,
  errors: object.isRequired
};

export default PinForm;
