import React, { Component } from 'react'
import { View, Text, TextInput, TouchableHighlight, StatusBar } from 'react-native'
import {observer} from 'mobx-react/native'
import {Provider} from 'mobx-react';
import stores from '../stores';
import Router from './Router'
import mainStyle from '../styles/mainStyle'

@observer
class TodoList extends Component {

  render() {
    // const {name} = this.props.store.store
    return (
      <Provider {...stores}>
        <Router />
      </Provider>
    );
  }
}

export default TodoList
