
export const DRAWS = 'DRAWS'
import AsyncStorage from '@react-native-community/async-storage'

export const getDraws = (gameType) => {
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
      fetch(`https://www.veikkaus.fi/api/odj/v2/sport-games/draws?game-names=${gameType}`, {
        method: "GET",
        headers: headers
      })

    const resData = await response.json()

    console.log("resData", resData);


    dispatch(
      {
        type: DRAWS,
        draws: resData.draws
        // balance: resData.balances.CASH.balance,
        // currency: resData.balances.CASH.currency
      }
    )
  }
}
