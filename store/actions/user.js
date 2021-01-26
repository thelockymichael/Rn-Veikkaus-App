
export const BALANCE = 'BALANCE'
import AsyncStorage from '@react-native-community/async-storage'



export const getBalance = () => {
  return async (dispatch) => {

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

    dispatch(
      {
        type: BALANCE,
        balance: resData.balances.CASH.balance,
        currency: resData.balances.CASH.currency
      }
    )
  }
}
