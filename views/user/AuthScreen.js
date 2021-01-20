import React, { useState, useEffect, useReducer, useCallback } from 'react'
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Alert,
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'

import * as authActions from '../../store/actions/auth'
import { ActivityIndicator } from 'react-native-paper'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    }

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    }
    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    }
  }
  return state
}

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')

      if (!userData) {
        return
      }

      const transformedData = JSON.parse(userData)
      const { token, user_id, expiryDate } = transformedData
      const expirationDate = new Date(expiryDate)

      if (expirationDate <= new Date() ||
        !token || !user_id) {
        return
      }

      props.navigation.navigate('Home')
      dispatch(authActions.authenticate(user_id, token))
    }
    tryLogin()
  }, [dispatch])


  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    inputValidities: {
      username: false,
      password: false,
      email: false,
      full_name: true,
    },
    formIsValid: false,
  })

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!',
        error,
        [{ text: 'Okay' }])
    }
  }, [error])

  const authHandler = async () => {
    const { inputValues } = formState
    let action

    if (isSignup) {
      action =
        authActions.signup(
          inputValues.username,
          inputValues.password,
          inputValues.email,
          inputValues.full_name,
        )
    } else {
      action =
        authActions.login(
          inputValues.username,
          inputValues.password,
        )
    }
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(action)
      props.navigation.navigate('Home')
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }


  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      })
    },
    [dispatchFormState],
  )

  return (
    <KeyboardAvoidingView behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient
        colors={['#ffedff', '#ffe3ff']}
        style={styles.gradient}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            {isSignup &&
              <>
                <Input
                  id="email"
                  label="E-Mail *"
                  keyboardType="email-address"
                  required
                  email
                  autoCapitalize="none"
                  errorText="Please enter a valid username."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="full_name"
                  label="Full name (Optional)"
                  keyboardType="default"
                  minLength={5}
                  autoCapitalize="none"
                  errorText=""
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
              </>}

            <Input
              id="username"
              label="Username *"
              keyboardType="default"
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid username."
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            <Input
              id="password"
              label="Password *"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>

              {isLoading ?
                <ActivityIndicator
                  size="smalL"
                  color={Colors.primaryColor}
                /> : (
                  <Button
                    title={isSignup ? 'Sign Up' : 'Login'}
                    color={Colors.primaryColor}
                    onPress={authHandler}
                  />
                )}

            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.accentColor}
                onPress={() => {
                  setIsSignup(!isSignup)
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView >
  )
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
})

export default AuthScreen
