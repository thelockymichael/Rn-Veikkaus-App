import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStore, combineReducers, applyMiddleware } from 'redux'

import Navigator from './navigators/Navigator';

// Auth
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import authReducer from './store/reducers/auth'

// Debugger
import { composeWithDevTools } from "redux-devtools-extension"

// Fonts
// import * as Font from 'expo-font'
// import { AppLoading } from "expo"

const rootReducer = combineReducers({
  auth: authReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)
  )
)

// const loadFonts = async () => {
//   await Font.loadAsync({
//     'open-sans-regular': require('./assets/fonts/OpenSans-Regular.tff'),
//   })
// }

const App = () => {
  // const [fontReady, setFontReady] = useState(false)


  // if (!fontReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={() => {
  //         setFontReady(true)
  //       }}
  //     />
  //   )
  // }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
