import React from 'react';
import { TextInput, Text, View } from 'react-native';

export default ({ label, onChange, keyboardType, value, placeholder, focused }) => {
  return (
    <View style={{ flex: 1}}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChange(text)}
          keyboardType={keyboardType}
          value={value}
          placeholder={placeholder}
          autoFocus={focused}
        />
    </View>
  );
}
