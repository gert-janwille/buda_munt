import React from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';
import {Link} from 'react-router-dom';
import {object, func, bool} from 'prop-types';

const Contact = ({errors, data, changeInput, sendMessage, success}) => {

  const handleContact = e => {
    e.preventDefault();
    sendMessage(e);
  };

  const handleChangeInput = e => {
    e.preventDefault();
    changeInput(e);
  };

  return (
      <main className='contact-container'>

        <h1 className='poppins-bol green-color heading'>Contact</h1>
        <p className='grey-color'>Komt u graag even langs om vragen te stellen? Dat is elke maandag mogelijk van 17u tot 18u. Meer informatie vindt u <Link to={`/`} className='blue-link'>hier</Link>.</p>
        {success ? <p className='heading3 green-color lato-bol'>Het bericht werd successvol verstuurd.</p> : null}
        <form method='POST' onSubmit={handleContact} className='registration-form contact-form'>

          <section className='label-container'>
            <label htmlFor='name' className='lato-bol light-grey-color'>Naam:</label>
            <label htmlFor='firstName' className='lato-bol light-grey-color'>Voornaam:</label>
            <label htmlFor='email' className='lato-bol light-grey-color'>E-mail:</label>
            <label htmlFor='question' className='lato-bol light-grey-color'>Wat is mijn vraag?:</label>

          </section>

          <section className='input-fields'>

            <div className='input-field'>
              <input className='grey-color' name='name' id='name' type='text' value={data.name} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.name : null}</p>
            </div>

            <div className='input-field'>
              <input className='grey-color' name='firstName' id='firstName' type='text' value={data.firstName} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.firstName : null}</p>
            </div>

            <div className='input-field'>
              <input className='grey-color' name='email' id='email' type='email' value={data.email} onChange={handleChangeInput} />
              <p className='error'>{!isEmpty(errors) ? errors.email : null}</p>
            </div>

            <div className='input-field'>
              <textarea className='textarea-long' name='question' id='question' value={data.question} onChange={handleChangeInput}></textarea>
              <p className='error'>{!isEmpty(errors) ? errors.question : null}</p>
            </div>

            <input type='submit' className='blue-button-link lato-bol' value='Verstuur' />


          </section>

        </form>
      </main>
  );
};

Contact.propTypes = {
  errors: object.isRequired,
  data: object.isRequired,
  changeInput: func.isRequired,
  sendMessage: func.isRequired,
  success: bool.isRequired
};

export default inject(
  ({contactStore}) => ({
    errors: contactStore.errors,
    data: contactStore.data,
    changeInput: contactStore.changeInput,
    sendMessage: contactStore.sendMessage,
    success: contactStore.success
  })
)(
  observer(Contact)
);
