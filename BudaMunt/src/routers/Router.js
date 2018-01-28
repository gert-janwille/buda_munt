import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';

import HomeScreen from '../containers/HomeScreen'


const ProfileScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const otherScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Other Screen</Text>
  </View>
);

const Router = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
  Other: {
    screen: otherScreen,
  },
});

export default Router;
