import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';


const GamingScreen = ({ navigation }) => {

  return (
    <View
      style={styles.container}
    >
      <Text>GamingScreen</Text>
    </View>
  );
};

export default GamingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
