import React from 'react';
import { Text, View } from 'react-native';

export default ({ label, data, fontWeight }) => {
  return (
    <View style={{alignSelf: 'stretch', flexDirection: 'row' }}>
        <View style={{ flex: 2, alignSelf: 'stretch' }} >
          <Text style={{ textAlign: 'left', fontSize: 13, fontWeight }}>{label}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text style={{ textAlign: 'right', fontWeight }}>{data}</Text>
        </View>
    </View>
  );
}
