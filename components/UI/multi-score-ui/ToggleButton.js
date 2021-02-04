import React, {
  useState
} from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"

const ToggleButton = (props) => {
  const [toggle, setToggle] = useState(props.value)

  const [toggleValue, setToggleValue] = useState(props.checked ?
    "" : props.item.number)


  const toggleHandler = () => {
    setToggle(!toggle)
    // console.log("What is my item.number?", props.item.number);

    props.scoreHandler(props.input, props.item)

    if (props.checked) {
      setToggleValue(!toggle ? "X" : "")
      props.scoreHandler(props.input, !toggle)
    }
  }

  return (
    <TouchableOpacity
      onPress={toggleHandler}
      style={{
        ...styles.buttonContainer,
        backgroundColor: toggle ? "dodgerblue" : '#F0F4F7'
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          color: toggle ? "white" : 'dodgerblue',
          fontSize: 16,
        }}
      >
        {toggleValue}
      </Text>

    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: 10,
    height: 30,
    width: 30,
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 6,
  }
})

export default ToggleButton