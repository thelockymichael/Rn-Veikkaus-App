import React, {
  useEffect,
  useState
} from 'react'
import { NavigationContainer } from "@react-navigation/native"
// Stack
import { createStackNavigator } from "@react-navigation/stack"
// Bottom Tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Ionicons
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons"

import { useSelector } from "react-redux"
// Screens
import HomeScreen from "../views/HomeScreen"
import DrawsScreen from "../views/DrawsScreen"
import GamingScreen from "../views/GamingScreen"
import AuthScreen from "../views/user/AuthScreen"// import React from 'react';

// Colors
import Colors from "../constants/Colors"

const Tab = createBottomTabNavigator()
const AuthStack = createStackNavigator()
const AppStack = createStackNavigator()

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      initialRouteName='Authentication'
    >
      <AuthStack.Screen
        name="Authentication"
        component={AuthScreen}
      />
    </AuthStack.Navigator>
  )
}

const AppScreens = () => {
  return (
    <AppStack.Navigator
      initialRouteName='Home'
    >
      <AppStack.Screen
        name="Home"
        component={TabScreen}
      />
    </AppStack.Navigator>
  )
}

const TabScreen = ({ navigation, route }) => {

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primaryColor
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline"
              size={25}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Draws"
        component={DrawsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="games"
              size={25}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Gaming"
        component={GamingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="youtube-gaming"
              size={25}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const Navigator = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setUser({})
    }, 500)
  }, [])

  const isLoggedIn = useSelector((state) =>
    state.auth.token)

  console.log("state.auth.token", isLoggedIn)
  return (
    <NavigationContainer>
      {isLoggedIn ?
        <AppScreens /> :
        (
          <AuthStackScreen />
        )
      }
    </NavigationContainer>
  )
}

export default Navigator

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// // Redux
// import { useSelector, useDispatch } from 'react-redux'


// // Screens
// import HomeScreen from "../views/HomeScreen"
// import AuthScreen from "../views/user/AuthScreen"

// const StackScreen = () => {
//   const isLoggedIn = useSelector((state) =>
//     state.auth.token)

//   return (
//     <Stack.Navigator>
//       {!isLoggedIn ?
//         <Stack.Screen
//           name="Authentication"
//           component={AuthScreen}
//         /> :
//         <Stack.Screen
//           name="Home"

//           component={HomeScreen}
//         />}

//     </Stack.Navigator>
//   );
// };

// const Navigator = () => {
//   return (
//     <NavigationContainer>
//       <StackScreen />
//     </NavigationContainer>
//   );
// };

// export default Navigator;
