import React from 'react';
import {string} from 'prop-types';
import {Route, Switch} from 'react-router-dom';

import {inject, observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Overzicht from './Overzicht';
import NewActivity from './NewActivity';
import Detail from './Detail';

import Registration from './registration';
import StepOne from './registration/StepOne';

import PrivateRoute from '../components/privateroute';

import Navigation from '../components/navigation';
import Footer from '../components/footer';

const App = () => (

  <section>
    {process.env.NODE_ENV !== `production` ? <DevTools /> : null}

    <Navigation />

    <section className='app-holder'>
      <Switch>
          <Route exact path='/' component={Home} />

          <PrivateRoute path='/overzicht/nieuw' component={NewActivity} />
          <Route path='/overzicht/:title/:_id' component={Detail} />
          <Route path='/overzicht' component={Overzicht} />

          <Route path='/inschrijven/step-1' component={StepOne} />
          <Route path='/inschrijven' component={Registration} />

          <Route path='/contact' component={Home} />
          <Route path='/login' component={Login} />

          <PrivateRoute exact path='/dashboard' component={Dashboard} />

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
