import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {object, func} from 'prop-types';
import {isEmpty} from 'lodash';

const Dashboard = ({account, getToken}) => {
  if (isEmpty(account)) getToken();

  return (
      <main className='dashboard-container'>

        <section className='transactions-holder'>
          <Link className='green-button' to={`/dashboard`}>Terug</Link>

          <article className='all-transactions'>
            <h2 className='lato-bol'>Transactions</h2>
            <div className='list-trans'>
              {!isEmpty(account.transactions) ? account.transactions.map((t, id) => <p key={Math.floor((1 + Math.random()) * 0x10000).toString(16)} className='list-trans-item'>{id + 1}: {t}</p>) : <p className='list-trans-item'>Er nog geen transacties gebeurd</p>}
            </div>
          </article>

        </section>


      </main>
  );
};

Dashboard.propTypes = {
  account: object.isRequired,
  getToken: func.isRequired
};

export default inject(
  ({dashboardStore}) => ({
    account: dashboardStore.account,
    getToken: dashboardStore.getToken
  })
)(
  observer(Dashboard)
);
