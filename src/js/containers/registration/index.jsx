import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {object, func} from 'prop-types';

const Registration = ({history, setSubscriptionType}) => {
  const handleSetUserType = e => {
    e.preventDefault();
    setSubscriptionType(e.currentTarget.innerHTML.replace(`Ik ben een `, ``));
    history.push(`/inschrijven/step-1`);
  };

  return (
      <main className='registration-container center-container'>

        <h1 className='poppins-bol green-color heading'>Schrijf je in</h1>
        <p className='grey-color registration-info'>Klaar om de Buda-munt te gebruiken? Schrijf je als de bliksem in in als handelaar / artiest of als gewone burger of bezoeker van het Buda-eiland.</p>

        <section className='register-select-type'>

          <article className='type-option button'>
            <img src='../assets/img/cash-desk.png' width='25%' alt='handelaar of artiest' />
            <a href='#' onClick={handleSetUserType} className='lato-bol'>Ik ben een handelaar of artiest</a>
          </article>

          <article className='type-option button'>
            <img src='../assets/img/home.png' width='25%' alt='bewoner of bezoeker' />
            <a href='#' onClick={handleSetUserType} className='lato-bol'>Ik ben een bewoner of bezoeker</a>
          </article>

        </section>

        <p className='grey-color'>Heeft u al een account? <Link to={`/login`} className='blue-link'>Log u hier in!</Link></p>
      </main>
  );
};

Registration.propTypes = {
  history: object.isRequired,
  setSubscriptionType: func.isRequired
};

export default inject(
  ({registrationStore}) => ({
    setSubscriptionType: registrationStore.setSubscriptionType
  })
)(
  observer(Registration)
);
