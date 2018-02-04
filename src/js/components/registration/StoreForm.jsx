import React from 'react';
import {Link} from 'react-router-dom';
import {isEmpty} from 'lodash';
import {inject, observer} from 'mobx-react';
import {func, object} from 'prop-types';

const StoreForm = ({history, handleChangeInput, data, validateForm, errors}) => {
  const handleValidateForm = e => {
    e.preventDefault();
    validateForm(document.querySelector(`.registration-form`)) === 200 ? history.push(`/inschrijven/step-2`) : null;
  };

  return (
    <form method='POST' className='registration-form'>

      <section className='label-container'>
        <label htmlFor='dealer' className='lato-bol light-grey-color'>Bedrijfsnaam:</label>
        <label htmlFor='description' className='lato-bol light-grey-color'>Wat kan ik aanbieden
in ruil voor BDA?:</label>
      </section>

      <section className='input-fields'>

        <article className='input-data'>
          <div className='input-text'>

            <div className='input-field'>
              <input className='grey-color' name='dealer' id='dealer' type='text' placeholder='John' value={data.dealer} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.dealer : null}</p>
            </div>

            <div className='input-field'>
              <textarea className='textarea-long' name='description' id='description' value={data.description} onChange={handleChangeInput}></textarea>
              <p className='error'>{!isEmpty(errors) ? errors.description : null}</p>
            </div>
          </div>

          <div className='avatar'>
            <img width='75%' src={data.fileURL} alt='avatar preview' />
            <label htmlFor='file' className='green-button-link lato-bol'>Upload Profielfoto</label>
            <input id='file' name='file' type='file' accept='image/*' onChange={handleChangeInput} />
          </div>

        </article>

        <p className='do-next-bar'>
          <Link to={`/inschrijven`} className='green-button-link lato-bol'>Terug</Link>
          <span className='line'></span>
          <a href='#'  onClick={handleValidateForm} className='blue-button-link lato-bol'>Verder</a>
        </p>

        <p className='grey-color'>Heeft u al een account? <Link to={`/login`} className='blue-link'>Log u hier in!</Link></p>
      </section>

    </form>
  );

};
StoreForm.propTypes = {
  handleChangeInput: func.isRequired,
  data: object.isRequired,
  validateForm: func.isRequired,
  errors: object.isRequired,
  history: object.isRequired
};

export default inject(
  ({registrationStore}) => ({
    data: registrationStore.data,
    validateForm: registrationStore.validateForm,
    errors: registrationStore.errors
  })
)(
  observer(StoreForm)
);
