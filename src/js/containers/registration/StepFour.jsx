import React from 'react';
import {inject, observer} from 'mobx-react';
// import {Link} from 'react-router-dom';
import {string, object, func} from 'prop-types';

import PinForm from '../../components/registration/PinForm';

const StepFour = ({history, subscriptionType, changeInput, submitForm, data}) => {
  if (subscriptionType === ``) history.push(`/inschrijven`);

  const handleChangeInput = e => {
    e.preventDefault();
    changeInput(e);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    submitForm(e);
  };

  return (
    <main className='registration-container'>
      <h2 className='lato-bol green-color step-title heading3'>Ik ben een {subscriptionType.includes(`bewoner`) ? `bewoner van het Buda-eiland` : `handelaar of artiest`}. Stap 4.</h2>
      <PinForm handleChangeInput={handleChangeInput} handleSubmitForm={handleSubmitForm} data={data} subscriptionType={subscriptionType} />
    </main>
  );
};

StepFour.propTypes = {
  subscriptionType: string.isRequired,
  history: object.isRequired,
  changeInput: func.isRequired,
  submitForm: func.isRequired,
  data: object.isRequired
};

export default inject(
  ({registrationStore}) => ({
    subscriptionType: registrationStore.subscriptionType,
    changeInput: registrationStore.changeInput,
    submitForm: registrationStore.submitForm,
    data: registrationStore.data
  })
)(
  observer(StepFour)
);
