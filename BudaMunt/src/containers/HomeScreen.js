import React, { Component } from 'react'
import { inject, observer } from 'mobx-react/native'

import { View, Text, StatusBar } from 'react-native';

const HomeScreen = ({name}) => {

  console.log(name);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="dark-content"/>
      
      <Text>{name}</Text>
      <Text>Home Screen</Text>
    </View>
  );

}

export default inject(
  ({store}) => ({
    name: store.name
  })
)(
  observer(HomeScreen)
);
