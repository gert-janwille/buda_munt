import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {object, func} from 'prop-types';
import {isEmpty} from 'lodash';

const Dashboard = ({history, user, getToken, logout, account}) => {

  if (isEmpty(user)) getToken();
  const isChecked = user.dealer !== undefined;

  const handleLogout = e => {
    e.preventDefault();
    if (logout()) history.push(`/`);
  };

  return (
      <main className='dashboard-container'>

        <section className='card-holder'>

          <article className='first-column'>

            <div className='images'>
              <img src='../../assets/img/default-profile.jpg' width='85%' alt='profile picture' />
              <img src={user.qr} width='100%' />
            </div>

            <div className='dashboard-label-container'>
              <label htmlFor='naam' className='lato-bol light-grey-color'>Naam:</label>
              <label htmlFor='voornaam' className='lato-bol light-grey-color'>Voornaam:</label>
              <label htmlFor='email' className='lato-bol light-grey-color'>E-mail:</label>
              <label htmlFor='balance' className='lato-bol light-grey-color'>Balance:</label>
              <label htmlFor='activities' className='lato-bol light-grey-color'>Opdrachten die open staan:</label>
              <label htmlFor='doneActivities' className='lato-bol light-grey-color'>Opdrachten waarbij u hielp:</label>
            </div>
          </article>

          <article className='second-column'>

            <div className='account-options'>

              <div className='profile-type'>
                <input type='radio' id='burger' name='profile-type' checked={!isChecked} />
                <label className='burger' htmlFor='burger'>Burger</label>

                <input type='radio' id='handelaar' name='profile-type' checked={isChecked} />
                <label htmlFor='handelaar'>Handelaar</label>
              </div>

              <div className='button'>
                <a href='#'>Account aanpassen</a>
              </div>

            </div>

            <p>{user.name}</p>
            <p>{user.firstName}</p>
            <p>{user.email}</p>
            <p>{account.balance} BDA</p>

            <div className='button overzicht-btn'>
              <Link to={`/overzicht`}>Bekijk de lijst</Link>
            </div>

            <div className='button overzicht-btn'>
              <Link to={`/dashboard/transacties`}>Bekijk transacties</Link>
            </div>

            <a href='#' onClick={handleLogout} className='blue-link logout'>Uitloggen</a>

          </article>


        </section>

      </main>
  );
};

Dashboard.propTypes = {
  user: object.isRequired,
  getToken: func.isRequired,
  logout: func.isRequired,
  history: object.isRequired,
  account: object.isRequired
};

export default inject(
  ({dashboardStore}) => ({
    user: dashboardStore.user,
    getToken: dashboardStore.getToken,
    logout: dashboardStore.logout,
    account: dashboardStore.account
  })
)(
  observer(Dashboard)
);
