import React, {
  useEffect,
  useState
} from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { useSelector } from "react-redux"
// Screens
import HomeScreen from "../views/HomeScreen"
import AuthScreen from "../views/user/AuthScreen"// import React from 'react';



const AuthStack = createStackNavigator()
const AppStack = createStackNavigator()

const AuthScreens = () => {
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
        component={HomeScreen}
      />
    </AppStack.Navigator>
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
          <AuthScreens />
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
