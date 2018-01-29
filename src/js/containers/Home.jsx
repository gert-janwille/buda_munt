import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';

const Home = () => (
  <main>
    <section>
      <h1 className='poppins-bol'>De Buda-munt, een uitmuntende manier om te betalen op het Buda-eiland.</h1>

      <div>
        <article>
          <img src='./assets/img/main-buda-community.png' alt='illustratie van de buda munt comunity' />
          <p>Zou je graag Buda-munten willen? Er zijn verschillende manieren om ze te verdienen.</p>
        </article>

        <article>

          <div>
            <p>Kan je toevallig heel goed klussen, voorlezen, babysitten,...? Maak dan snel een account aan om Buda-munten (BDA) te verzamelen. Met deze munt willen we de samenleving op het Buda-eiland versterken. Niemand wordt uitgesloten, iedere burger kan een steentje bijdragen of om hulp vragen.</p>
            <div className='button'><span className='icon hamburger'></span><Link to={`/overzicht`}>Bekijk het overzicht</Link></div>
          </div>

          <div>
            <h2 className='poppins-bol'>Bent u een handelaar of artiest?</h2>
            <p>Wilt u mee gebruik maken van Buda-munten in uw café? Bent u een artiest met een kleine band die graag zou willen optreden bij burgers thuis? Vul dan snel ons formulier in om deel te nemen aan ons concept.</p>
            <div className='button'><span className='icon plane'></span><Link to={`/inschrijven`}>Schrijf je in</Link></div>
          </div>

        </article>
      </div>

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
