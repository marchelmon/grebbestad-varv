import React, { Component } from 'react';
import { Image, Dimensions, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class GBVLogo extends Component {
  render() {
    return (
      <View style={{ width: SCREEN_WIDTH, padding: 10, height: SCREEN_WIDTH * 0.317, backgroundColor: '#ffffff' }}>
          <Image
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: 'cover',
              borderRadius: 4,
            }}
            source={require('../../assets/loggan.png')}
          />
      </View>
    );
  }
}

export default GBVLogo;
