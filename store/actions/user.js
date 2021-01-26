
export const BALANCE = 'BALANCE'

export const getBalance = (username, password) => {
  return async (dispatch) => {

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'X-ESA-API-Key': 'ROBOT'
    }

    const response = await fetch('https://www.veikkaus.fi/api/bff/v1/sessions',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          "type": "STANDARD_LOGIN",
          "login": username,
          "password": password
        }),

        // {"type":"STANDARD_LOGIN","login":username,"password":password}
      })

    if (!response.ok) {
      const errorResData = await response.json()
      console.log(errorResData)

      const message = 'Something went wrong!'
      if (!errorResData.message) {
        throw new Error(message)
      }

      throw new Error(errorResData.message)
    }

    // console.log("set cookie", response.headers.map['set-cookie']);

    const str = response.headers.map['set-cookie']

    const isessionId = helpers.getSessionId(str)
    // const isessionId = str.split('=')[1].split(';')[0]

    // console.log("str", isessionId);

    // const secondHeaders = {
    //   'Content-type': 'application/json',
    //   'Accept': 'application/json',
    //   'X-ESA-API-Key': 'ROBOT',
    //   'isessionid': isessionId
    // }

    // const response2 = await fetch("https://www.veikkaus.fi/api/v1/players/self/account", {
    //   method: "GET",
    //   headers: secondHeaders
    // })

    // const resData2 = await response2.json()

    // console.log(resData2);

    //   authenticate(
    //     resData.user.user_id,
    //     resData.token),
    // )

    dispatch(authenticate(
      isessionId,
    ))

    const expirationDate =
      new Date(new Date().getTime() + 3600000,
      )
    savedDataToStorage(
      isessionId,
      expirationDate
    )

    //   dispatch(authenticate(
    //     resData.user.user_id,
    //     resData.token),
    // )
    // const expirationDate =
    //   new Date(new Date()
    //     .getTime() + 3600000,
    //   )
    // savedDataToStorage(
    //   resData.token,
    //   resData.user.user_id,
    //   expirationDate,
    // )
  }
}
