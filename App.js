import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Jotain lol="ds" assgags="asfaga" asgjadngk="422412" asgjadngk="422412" />
    </View>
  );
}

const foo = {
  bar: 'This is a bar.',
  baz: { qux: 'This is a qux' },
  difficult: 'to read',
};

const Jotain = (props) => (
  <View>
    <Text>{props.lol}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
