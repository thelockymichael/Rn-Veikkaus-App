import React, {
  useState,
  useEffect
} from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import { useDispatch } from 'react-redux'

//import * as authActions from '../../store/actions/auth'
import * as authActions from '../store/actions/auth'

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const [currentBalance, setCurrentBalance] = useState(null)

  const logoutHandler = async () => {

    dispatch(authActions.logout())
    await AsyncStorage.clear()
    navigation.navigate('Authentication')

  }

  const getSession = async () => {
    const session = await AsyncStorage.getItem("userData")

    console.log("session token", session.token);

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'X-ESA-API-Key': 'ROBOT',
      'isessionid': session.token
    }

    const response = await
      fetch("https://www.veikkaus.fi/api/v1/players/self/account", {
        method: "GET",
        headers: headers
      })

    const resData = await response.json()

    console.log("resData", resData);

    setCurrentBalance(`${resData.balances.CASH.balance} ${resData.balances.CASH.currency}`)
  }

  useEffect(() => {
    getSession()
  }, [])

  //       dispatch(authActions.authenticate(/* user_id */ token))

  return (
    <View
      style={styles.container}
    >
      <Button
        title="Log out"
        onPress={logoutHandler}
      />

      <Text style={{ fontSize: 24 }}>Balance</Text>
      <Text>{currentBalance}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
