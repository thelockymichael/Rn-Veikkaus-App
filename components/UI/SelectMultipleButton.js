import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet
} from "react-native"

const ios_blue = '#007AFF'

const SelectMultipleButton = (props) => {
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    setSelected(props.selected)
  }, [])

  useEffect(() => {
    setSelected(props.selected)
  }, [props.selected])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.singleTap(props.value)
      }}
    >
      <View
        style={
          [
            styles.button,
            props.buttonViewStyle,
            {
              bordercolor: selected ?
                props.highLightStyle.borderTintColor
                : props.highLightStyle.borderColor,
              backgroundColor: selected ?
                props.highLightStyle.backgroundTintColor
                : props.highLightStyle.backgroundColor
            }
          ]
        }>
        <Text style={
          [
            styles.text,
            props.textStyle,
            {color: selected ? props.highLightStyle.textTintColor : props.highLightStyle.textColor}
          ]
        }>
          {props.displayValue === undefined ? props.value : props.displayValue}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

SelectMultipleButton.propTypes = {
  selected: PropTypes.bool,
  value: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.number
    ]
  ).isRequired,
  displayValue: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.number
    ]
  ),

  highLightStyle: PropTypes.shape({
    borderColor: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    borderTintColor: PropTypes.string.isRequired,
    backgroundTintColor: PropTypes.string.isRequired,
    textTintColor: PropTypes.string.isRequired,
  }),


  buttonViewStyle: PropTypes.object,
  textStyle: PropTypes.object,
  singleTap: PropTypes.func,
}

SelectMultipleButton.defaultProps = {
  selected: false,
  highLightStyle: {
    borderColor: 'gray',
    backgroundColor: 'transparent',
    textColor: 'gray',
    borderTintColor: ios_blue,
    backgroundTintColor: 'transparent',
    textTintColor: ios_blue,
  },

  singleTap: (valueTap) => {},
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  text: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  }
})

export default SelectMultipleButton