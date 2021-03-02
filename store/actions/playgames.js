import AsyncStorage from '@react-native-community/async-storage';

export const MULTISCORE_DATA = 'MULTISCORE';

export const playMultiscore = (formData) => {
  return async (dispatch) => {
    const session = await AsyncStorage.getItem('userData');

    console.log('FORMUS DATUS', formData);

    console.log('session token', session.token);

    const headers = {
      'Content-type': 'application/json',
      Accept: 'application/json',
      'X-ESA-API-Key': 'ROBOT',
      isessionid: session.token,
    };

    const response = await fetch(
      `https://www.veikkaus.fi/api/sport-interactive-wager/v1/tickets`,
      {
        method: 'POST',
        body: JSON.stringify({
          listIndex: '10',
          gameName: 'MULTISCORE',
          price: 20,
          boards: [
            {
              betType: 'Regular',
              stake: 20,
              selections: [
                {
                  homeScores: [0],
                  awayScores: [1],
                },
                {
                  homeScores: [2],
                  awayScores: [3],
                },
                {
                  homeScores: [4],
                  awayScores: [5],
                },
              ],
            },
          ],
        }),
        headers: headers,
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error;
      console.log('LOLLERO', errorResData);
      const message = 'Amount exceeds balance!';

      throw new Error(message);
    }

    const resData = await response.json();

    console.log('resData', resData);

    dispatch({
      type: MULTISCORE_DATA,
      multiscoreData: resData,
    });
  };

  // dispatch(
  //   {
  //     type: DRAWS,
  //     draws: resData.draws
  //     // balance: resData.balances.CASH.balance,
  //     // currency: resData.balances.CASH.currency
  //   }
  // )
};
