import React from 'react';
import {inject, observer} from 'mobx-react';
// import {Link} from 'react-router-dom';
import {bool} from 'prop-types';

const Dashboard = () => {
  return (
      <main className='home-container'>


      </main>
  );
};

Dashboard.propTypes = {
  isPopUpOpen: bool.isRequired
};

export default inject(
  ({activityStore}) => ({
    isPopUpOpen: activityStore.isPopUpOpen
  })
)(
  observer(Dashboard)
);
