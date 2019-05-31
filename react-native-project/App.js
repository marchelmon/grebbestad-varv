import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';

import HomeScreen from './src/components/HomeScreen'
import GBVLogo from './src/components/GBVLogo';


export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={{ marginTop: 25, backgroundColor: '#fffffff' }}>
        <GBVLogo />
        <HomeScreen />
      </ScrollView>
    );
  }
}
