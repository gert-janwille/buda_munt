import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';
import {func, object, string} from 'prop-types';

const LocationForm = ({history, subscriptionType, handleChangeInput, data, errors, validateForm}) => {
  const URLNumber = subscriptionType.includes(`bewoner`) ? 3 : 4;

  const handleValidateForm = e => {
    e.preventDefault();
    validateForm(document.querySelector(`.registration-form`)) === 200 ? history.push(`/inschrijven/step-${URLNumber}`) : null;
  };

  return (
    <form method='POST' className='registration-form large-container'>

      <section className='label-container'>
        <label htmlFor='street' className='lato-bol light-grey-color'>Straatnaam:</label>
        <label htmlFor='houseNumber' className='lato-bol light-grey-color'>Huisnummer:</label>
        <label htmlFor='bus' className='lato-bol light-grey-color'>Bus:</label>
        <label htmlFor='zip' className='lato-bol light-grey-color'>Postcode:</label>
      </section>

      <section className='input-fields'>

        <article className='input-data'>
          <div className='input-text'>

            <div className='input-field'>
              <input className='grey-color' name='street' id='street' type='street' value={data.street} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.street : null}</p>
            </div>

            <div className='input-field'>
              <input className='grey-color' name='houseNumber' id='houseNumber' type='houseNumber' value={data.houseNumber} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.houseNumber : null}</p>
            </div>

            <div className='input-field'>
              <input className='grey-color' name='bus' id='bus' type='bus' placeholder='Optional' value={data.bus} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.bus : null}</p>
            </div>

            <div className='input-field'>
              <input className='grey-color' name='zip' id='zip' type='zip' value={data.zip} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.zip : null}</p>
            </div>

          </div>

        </article>

        <p className='do-next-bar'>
          <Link to={`/inschrijven/step-${URLNumber - 2}`} className='green-button-link lato-bol'>Terug</Link>
          <span className='line'></span>
          <a href='#'  onClick={handleValidateForm} className='blue-button-link lato-bol'>Verder</a>
        </p>

      </section>

    </form>
  );

};
LocationForm.propTypes = {
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
  observer(LocationForm)
);
