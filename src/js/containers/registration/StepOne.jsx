import React from 'react';
import {inject, observer} from 'mobx-react';
// import {Link} from 'react-router-dom';
import {string, object} from 'prop-types';

const StepOne = ({history, subscriptionType}) => {
  if (subscriptionType === ``) history.push(`/inschrijven`);
  return (
    <main className='registration-container'>


    </main>
  );
};

StepOne.propTypes = {
  subscriptionType: string.isRequired,
  history: object.isRequired
};

export default inject(
  ({registrationStore}) => ({
    subscriptionType: registrationStore.subscriptionType
  })
)(
  observer(StepOne)
);
