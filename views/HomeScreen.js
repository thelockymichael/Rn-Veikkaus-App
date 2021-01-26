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

import * as authActions from '../store/actions/auth'
import * as userActions from '../store/actions/user'

// React Redux
import { useSelector } from "react-redux"

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const [currentBalance, setCurrentBalance] = useState(null)

  const balance = useSelector((state) => state.user.balance)
  const currency = useSelector((state) => state.user.currency)

  console.log("balance", balance);

  const logoutHandler = async () => {

    dispatch(authActions.logout())
    await AsyncStorage.clear()
    navigation.navigate('Authentication')

  }

  useEffect(() => {
    dispatch(userActions.getBalance())
  }, [dispatch])


  return (
    <View
      style={styles.container}
    >
      <Button
        title="Log out"
        onPress={logoutHandler}
      />

      <Text style={{ fontSize: 24 }}>Balance</Text>
      <Text>{balance} {currency}</Text>
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
