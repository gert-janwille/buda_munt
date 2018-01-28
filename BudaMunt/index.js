import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import {Provider} from 'mobx-react';

import stores from './src/stores';
import Router from './src/routers/Router';

class BudaMunt extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BudaMunt', () => BudaMunt);
