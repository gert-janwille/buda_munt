import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {object} from 'prop-types';
import {isEmpty} from 'lodash';

import SearchBar from '../components/overview/SearchBar';
import FilterBar from '../components/overview/FilterBar';
import ActivityItem from '../components/overview/ActivityItem';
import DealerItem from '../components/overview/DealerItem';

const Overzicht = ({chores, promo = {}, dealers}) => {
  chores = chores.error ? [] : chores;
  return (
      <main className='overzicht-container'>
        <SearchBar />

        <FilterBar />

        <section className='overzicht-content'>

          <div className='activities-all'>

            <article className='promoting'>
              <img width='30%' src='../assets/img/icons/thumb-up.png' alt='Illustratie duim omhoog' />
              <div className='promoting-content'>
                <h2 className='heading green-color poppins-bol'>In de kijker</h2>
                <p>{`${!isEmpty(promo) ? promo.username : ``} zoekt: ${!isEmpty(promo)  ? promo.description : ``}`}</p>
              </div>
              <Link to={`/overzicht/${!isEmpty(promo) ? promo.title.toLowerCase().split(` `).join(`-`) : ``}/${!isEmpty(promo) ? promo._id : ``}`} className='blue-link promoting-link'>Lees meer &gt;</Link>
            </article>

            <article className='activities-list'>
              <div className='header-row table-row light-grey-color lato-bol'>
                <span className='column-o'>Aanbieding of aanvraag</span>
                <span className='column-m'>Wat bied ik aan / Wat zoek ik?</span>
                <span className='column-o'>Afzender</span>
                <span className='column-o'>Reacties</span>
                <span className='column-f'>Prijs</span>
              </div>

              {!isEmpty(chores) ? chores.map(c => <ActivityItem key={c._id} {...c} />) : <p>Sorry, er zijn momenteel geen werkjes.</p>}

            </article>
          </div>

          <article className='local-stores-container'>
            <h3 className='heading3 light-grey-color lato-bol'>Plaatsen waar u kunt betalen met Buda-munten</h3>
              <div className='all-stores'>
                {!isEmpty(dealers) ? dealers.map(d => <DealerItem key={d._id} {...d} />) : `Sorry we vonden momenteel geen dealers.`}
              </div>
          </article>

        </section>

      </main>
  );
};

Overzicht.propTypes = {
  chores: object.isRequired,
  promo: object.isRequired,
  dealers: object.isRequired
};

export default inject(
  ({activityStore, dealerStore}) => ({
    chores: activityStore.chores,
    promo: activityStore.promo,
    dealers: dealerStore.dealers
  })
)(
  observer(Overzicht)
);
