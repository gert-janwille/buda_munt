import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';

import ActivityItem from '../components/home/ActivityItem';

import {activities} from '../../assets/data/activities.json';

const Home = () => (
    <main className='home-container'>
      <header className='home-header'>

        <h1 className='poppins-bol home-title heading'>De Buda-munt, een uitmuntende manier om te betalen op het Buda-eiland.</h1>

        <div className='fold-holder'>

          <section className='home-split home-split-left'>
            <img width='100%' src='./assets/img/main-buda-community.png' alt='illustratie van de buda munt comunity' />
            <article>
              <p>Zou je graag Buda-munten willen? Er zijn verschillende manieren om ze te verdienen.</p>
              <h2 className='poppins-bol heading2 green-color'>De activiteiten.</h2>
            </article>
          </section>

          <section className='home-split home-split-right'>

            <article className='home-article-item'>
              <p>Kan je toevallig heel goed klussen, voorlezen, babysitten,...? Maak dan snel een account aan om Buda-munten (BDA) te verzamelen. Met deze munt willen we de samenleving op het Buda-eiland versterken. Niemand wordt uitgesloten, iedere burger kan een steentje bijdragen of om hulp vragen.</p>
              <div className='button home-deco-container'>
                <span className='line line-short'></span>
                <span className='icon-overlay hamburger'></span>
                <Link to={`/overzicht`}>Bekijk het overzicht</Link>
              </div>
            </article>

            <article className='home-article-item'>
              <h2 className='poppins-bol heading2'>Bent u een handelaar of artiest?</h2>
              <p>Wilt u mee gebruik maken van Buda-munten in uw café? Bent u een artiest met een kleine band die graag zou willen optreden bij burgers thuis? Vul dan snel ons formulier in om deel te nemen aan ons concept.</p>
              <div className='button home-deco-container'>
                <span className='line line-long'></span>
                <span className='icon-overlay plane'></span>
                <Link to={`/inschrijven`}>Schrijf je in</Link>
              </div>
            </article>

          </section>

        </div>

      </header>

      <section className='home-activities'>
        <article className='home-activities-popup'></article>

        <article className='home-activities-overview'>
          {activities.map(activity => <ActivityItem key={activity.id} {...activity} />)}
        </article>

      </section>

    </main>
  );

export default inject(
  ({store}) => ({
    name: store.name
  })
)(
  observer(Home)
);
