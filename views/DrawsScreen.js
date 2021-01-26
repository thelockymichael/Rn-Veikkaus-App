import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';


const DrawsScreen = ({ navigation }) => {

  return (
    <View
      style={styles.container}
    >
      <Text>DrawsScreen</Text>
    </View>
  );
};

export default DrawsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
