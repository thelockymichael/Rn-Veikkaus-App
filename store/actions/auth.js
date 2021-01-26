export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'
import AsyncStorage from '@react-native-community/async-storage'

// Helpers
import helpers from "../../utils/helpers"

export const authenticate = (/* userId */token) => {
  return { type: AUTHENTICATE, /* userId, */ token }
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

    if (!response.ok) {
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


    const str = response.headers.map['set-cookie']

    const isessionId = helpers.getSessionId(str)


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
  }
}

const savedDataToStorage = (token, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    expiryDate: expirationDate.toISOString(),
  }))
}

export const logout = () => {
  return { type: LOGOUT }
}

