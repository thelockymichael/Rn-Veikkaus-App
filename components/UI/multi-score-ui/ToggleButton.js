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
  const [toggle, setToggle] = useState(false)
  const [color, setColor] = useState('white')

  const [toggleValue, setToggleValue] = useState(props.checked ?
    "" : props.number)



  const toggleHandler = () => {
    setToggle(!toggle)

    if (props.checked) {
      setToggleValue(!toggle ? "X" : "")
    }
  }



  return (
    <TouchableOpacity
      onPress={toggleHandler}
      style={{
        marginRight: 10,
        height: 30,
        width: 30,
        backgroundColor: toggle ? "dodgerblue" : '#F0F4F7',
        justifyContent: 'center',
        elevation: 5,
        borderRadius: 6,
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

})

export default ToggleButton