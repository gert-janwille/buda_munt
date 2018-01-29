import React from 'react';
import {string} from 'prop-types';
import {Route, Switch} from 'react-router-dom';

import {inject, observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Home from './Home';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

const App = () => (

  <section>
    {process.env.NODE_ENV !== `production` ? <DevTools /> : null}

    <Navigation />

    <section className='app-holder'>
      <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/overzicht' component={Home} />
          <Route path='/inschrijven' component={Home} />
          <Route path='/contact' component={Home} />
          <Route path='/login' component={Home} />

          <Route component={Home} />
        </Switch>
    </section>

    <Footer />

  </section>

);

App.propTypes = {
  name: string.isRequired
};

export default inject(
  ({store}) => ({
    name: store.name
  })
)(
  observer(App)
);
