import React from 'react';
import {inject, observer} from 'mobx-react';
// import {Link} from 'react-router-dom';
import {string, object, func} from 'prop-types';

import UserForm from '../../components/registration/UserForm';
import LocationForm from '../../components/registration/LocationForm';

const StepTwo = ({history, subscriptionType, changeInput}) => {
  if (subscriptionType === ``) history.push(`/inschrijven`);

  const handleChangeInput = e => {
    e.preventDefault();
    changeInput(e);
  };

  return (
    <main className='registration-container'>
      <h2 className='lato-bol green-color step-title heading3'>Ik ben een {subscriptionType.includes(`bewoner`) ? `bewoner van het Buda-eiland` : `handelaar of artiest`}. Stap 2.</h2>

      {subscriptionType.includes(`bewoner`) ?
        <LocationForm handleChangeInput={handleChangeInput} subscriptionType={subscriptionType} history={history} /> :
        <UserForm handleChangeInput={handleChangeInput} subscriptionType={subscriptionType} history={history} />}

    </main>
  );
};

StepTwo.propTypes = {
  subscriptionType: string.isRequired,
  history: object.isRequired,
  changeInput: func.isRequired
};

export default inject(
  ({registrationStore}) => ({
    subscriptionType: registrationStore.subscriptionType,
    changeInput: registrationStore.changeInput,
    data: registrationStore.data,
    errors: registrationStore.errors,
    validateForm: registrationStore.validateForm
  })
)(
  observer(StepTwo)
);
