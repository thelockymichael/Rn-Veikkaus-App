import React, {
  useState,
  useEffect
} from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import {
  StyleSheet,
  View,
  Text
} from 'react-native';



const HomeScreen = () => {
  const [currentBalance, setCurrentBalance] = useState(null)

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

  return (
    <View
      style={styles.container}
    >
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
