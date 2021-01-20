export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'AUTHENTICATE'
import AsyncStorage from '@react-native-community/async-storage'

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId, token }
}

export const signup = (username, password, email, full_name) => {
  return async (dispatch) => {
    const response = await fetch('http://media.mw.metropolia.fi/wbma/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
          full_name,
        }),
      })

    console.log('PERKELE')
    if (!response.ok) {
      console.log('WADAFAK')
      const errorResData = await response.json()
      const errorId = errorResData.error
      console.log(errorResData)
      const message = 'Something went wrong!'

      if (errorId.includes('ER_DUP_ENTRY')) {
        throw new Error('Username already exists.')
      }

      throw new Error(message)
    }

    const resData = await response.json()
    console.log('resData', resData)

    dispatch(
      login(
        username,
        password,
      ),
    )


    /*     dispatch(
      authenticate(
        resData.user.user_id,
        resData.token),
    ) */
    /*     dispatch({
    type: SIGNUP,
    token: resData.token,
    user_id: resData.user.token,
  }) */
    /*     const expirationDate =
      new Date(new Date()
        .getTime() * 3600000,
      )
    savedDataToStorage(
      resData.token,
      resData.user.user_id,
      expirationDate,
    ) */
  }
}

export const login = (username, password) => {
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

    if (response.ok) {

      console.log("LOGIN SUCCESSFUL")
      console.log(response)

      const resData = await response.json()

      console.log("res", resData);
    }


    // const resData = await response.json()

    // console.log('resData', resData)
    // console.log('resData 1', resData.user.user_id)
    // console.log('resData 2', resData.token)

    // dispatch(
    //   authenticate(
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

const savedDataToStorage = (token, user_id, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    user_id,
    expiryDate: expirationDate.toISOString(),
  }))
}

export const logout = () => {
  return { type: LOGOUT }
}

