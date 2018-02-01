import React from 'react';
import {inject, observer} from 'mobx-react';
// import {Link} from 'react-router-dom';
import {bool} from 'prop-types';

const Home = () => {
  return (
      <main className='home-container'>


      </main>
  );
};

Home.propTypes = {
  isPopUpOpen: bool.isRequired
};

export default inject(
  ({activityStore}) => ({
    isPopUpOpen: activityStore.isPopUpOpen
  })
)(
  observer(Home)
);
