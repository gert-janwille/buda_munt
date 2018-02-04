import React from 'react';
import {inject, observer} from 'mobx-react';
// import {Link} from 'react-router-dom';
import {string, object, func} from 'prop-types';

import PinForm from '../../components/registration/PinForm';
import LocationForm from '../../components/registration/LocationForm';

const StepThree = ({history, subscriptionType, changeInput, submitForm, data, errors}) => {
  if (subscriptionType === ``) history.push(`/inschrijven`);

  const handleChangeInput = e => {
    e.preventDefault();
    changeInput(e);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    submitForm(e, history);
  };

  return (
    <main className='registration-container'>
      <h2 className='lato-bol green-color step-title heading3'>Ik ben een {subscriptionType.includes(`bewoner`) ? `bewoner van het Buda-eiland` : `handelaar of artiest`}. Stap 3.</h2>

      {subscriptionType.includes(`bewoner`) ?
        <PinForm handleChangeInput={handleChangeInput} handleSubmitForm={handleSubmitForm} data={data} subscriptionType={subscriptionType} errors={errors} /> :
        <LocationForm handleChangeInput={handleChangeInput} handleSubmitForm={handleSubmitForm} subscriptionType={subscriptionType} history={history} />}

    </main>
  );
};

StepThree.propTypes = {
  subscriptionType: string.isRequired,
  history: object.isRequired,
  changeInput: func.isRequired,
  submitForm: func.isRequired,
  data: object.isRequired,
  errors: object.isRequired
};

export default inject(
  ({registrationStore}) => ({
    subscriptionType: registrationStore.subscriptionType,
    changeInput: registrationStore.changeInput,
    submitForm: registrationStore.submitForm,
    data: registrationStore.data,
    errors: registrationStore.errors
  })
)(
  observer(StepThree)
);
