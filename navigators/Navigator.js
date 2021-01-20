import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Redux
import { useSelector, useDispatch } from 'react-redux'


// Screens
import HomeScreen from "../views/HomeScreen"
import AuthScreen from "../views/user/AuthScreen"

const StackScreen = () => {
  const isLoggedIn = useSelector((state) =>
    state.auth.token)

  return (
    <Stack.Navigator>
      {!isLoggedIn ?
        <Stack.Screen
          name="Authentication"
          component={AuthScreen}
        /> :
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />}

    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
