import React from 'react';
import {Route, Switch} from 'react-router-dom';
import DevTools from 'mobx-react-devtools';

import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Overzicht from './Overzicht';
import NewActivity from './NewActivity';
import Detail from './Detail';
import Contact from './Contact';

import Registration from './registration';
import StepOne from './registration/StepOne';
import StepTwo from './registration/StepTwo';
import StepThree from './registration/StepThree';
import StepFour from './registration/StepFour';

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
          <Route path='/inschrijven/step-2' component={StepTwo} />
          <Route path='/inschrijven/step-3' component={StepThree} />
          <Route path='/inschrijven/step-4' component={StepFour} />
          <Route path='/inschrijven' component={Registration} />

          <Route path='/contact' component={Contact} />
          <Route path='/login' component={Login} />

          <PrivateRoute exact path='/dashboard' component={Dashboard} />

          <Route component={Home} />
        </Switch>
    </section>

    <Footer />

  </section>

);

App.propTypes = {

};

export default App;
