import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {bool} from 'prop-types';

import ItemHolder from '../components/home/ItemHolder';
import PopUpActivity from '../components/home/PopUpActivity';

const Home = ({isPopUpOpen}) => (
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
              <p>Kan je toevallig <span className='underline'>heel goed klussen, voorlezen, babysitten,...?</span> Maak dan snel een account aan om <span className='underline'>Buda-munten</span> (BDA) te verzamelen. Met deze munt willen we de samenleving op het Buda-eiland versterken. Niemand wordt uitgesloten, iedere burger kan een steentje bijdragen of om hulp vragen.</p>
              <div className='button home-deco-container'>
                <span className='line line-short'></span>
                <span className='icon-overlay hamburger'></span>
                <Link to={`/overzicht`}>Bekijk het overzicht</Link>
              </div>
            </article>

            <article className='home-article-item'>
              <h2 className='poppins-bol heading2'>Hebt u zin om mee te doen?</h2>
              <p>Wilt u mee gebruik maken van Buda-munten in <span className='underline'>uw café?</span> Bent u een artiest met <span className='underline'>een kleine band</span> die graag zou willen optreden bij burgers thuis? Bent u <span className='underline'>een bewoner of bezoeker</span> en wilt u anderen helpen of hulp vragen? <span className='underline'>Vul dan snel ons formulier in</span> om deel te nemen aan ons concept.</p>
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
        {!isPopUpOpen ? <ItemHolder /> : <PopUpActivity />}
      </section>

    </main>
  );

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
