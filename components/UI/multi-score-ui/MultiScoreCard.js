import React, {
  useReducer,
  useState
} from "react";
import { StyleSheet, View, Text } from "react-native";
// import MaterialCheckbox from "./components/MaterialCheckbox";
// import MaterialCheckboxWithLabel from "./components/MaterialCheckboxWithLabel";

// import { ToggleButton } from "react-native-paper"

import Colors from "../../../constants/Colors"

// Toggle Button
import ToggleButton from "./ToggleButton"

import { useDispatch } from 'react-redux'

const formReducer = (state, action) => {

}

const MultiScoreCard = (props) => {

  useReducer(formReducer, {
    inputValues: {
      noAwayWins: '',
      noDrawWins: '',
      noHomeWins: ''
    },
    inputValidities: {},
    formIsValid: false
  })

  const handleFirstToggle = (selectedItem) => {

    const newArr = firstScoreArray.map(
      item => {
        if (item.number == selectedItem.number) {
          return {
            number: item.number,
            selected: !selectedItem.selected
          }
        } else {
          return item
        }
      }
    )

    setFirstScoreArray(newArr)
  }

  const handleSecondToggle = (selectedItem) => {
    const newArr = secondScoreArray.map(
      item => {
        if (item.number == selectedItem.number) {
          return {
            number: item.number,
            selected: !selectedItem.selected
          }
        } else {
          return item
        }
      }
    )

    setSecondScoreArray(newArr)
  }

  const handleToggleOption = (state, action) => {
    switch (action) {
      case 'DRAW':
        setNoDraws(state)
        break
      case 'HOME':
        setNoHomes(state)
        break
      case 'AWAY':
        setNoAways(state)
        break
    }
  }


  const [firstScoreArray, setFirstScoreArray] = useState([
    { number: 1, selected: false },
    { number: 2, selected: false },
    { number: 3, selected: false },
    { number: 4, selected: false },
    { number: 5, selected: false },
    { number: 6, selected: false },
    { number: 7, selected: false },
    { number: 8, selected: false },
  ])

  console.log("First Score Arr", firstScoreArray);

  const [secondScoreArray, setSecondScoreArray] = useState([
    { number: 1, selected: false },
    { number: 2, selected: false },
    { number: 3, selected: false },
    { number: 4, selected: false },
    { number: 5, selected: false },
    { number: 6, selected: false },
    { number: 7, selected: false },
    { number: 8, selected: false },
  ])

  console.log("Second Score Arr", secondScoreArray);

  const [noDraws, setNoDraws] = useState(false)
  const [noHomes, setNoHomes] = useState(false)
  const [noAways, setNoAways] = useState(false)

  console.log("Draws", noDraws);
  console.log("Homes", noHomes);
  console.log("Aways", noAways);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <Text style={styles.opponentTitles}>Hello - Florentina</Text>
          <Text style={styles.firstOpponent}>Torino</Text>
          <View style={styles.firstOpponentCheckBoxes}>
            {/* <ToggleButton
              value="bluetooth"
              icon="numeric-0"
              color={Colors.primaryColor} */}
            {firstScoreArray.map(item => (
              <ToggleButton
                key={item.number}
                number={item.number}
                scoreHandler={() => handleFirstToggle(item)}
              />
            ))}

          </View>
          <Text style={styles.secondOpponent}>Florentina</Text>
          <View style={styles.secondOpponentCheckBoxes}>
            {secondScoreArray.map(item => (
              <ToggleButton
                key={item.number}
                number={item.number}
                scoreHandler={() => handleSecondToggle(item)}
              />
            ))}
          </View>
        </View>
        <View style={styles.scoreResults}>
          <View style={styles.firstRowScoreResults}>
            <View style={styles.scoreResult}>
              <ToggleButton
                scoreHandler={handleToggleOption}
                action="HOME"
                checked
              />
              <Text>Ei kotivoittoja</Text>
            </View>
            <View style={styles.scoreResult}>
              <ToggleButton
                scoreHandler={handleToggleOption}
                action="DRAW"
                checked
              />
              <Text>Ei tasapelejä</Text>
            </View>
          </View>
          <View style={styles.secondRowScoreResults}>
            <View style={styles.scoreResult}>
              <ToggleButton
                scoreHandler={handleToggleOption}
                action="AWAY"
                checked
              />
              <Text>Ei vierasvoittoja</Text>
            </View>
          </View>
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  container: {
    // NEW PROPERTIES
    width: 400,
    height: 400,
    // alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },

  opponentTitles: {
    color: "rgba(2,60,142,1)",
    height: 17,
    width: 123,
    marginLeft: 8
  },
  firstOpponent: {
    color: "rgba(2,60,142,1)",
    marginTop: 20,
    marginLeft: 8
  },
  secondOpponent: {
    color: "rgba(2,60,142,1)",
    marginTop: 20,
    marginLeft: 8
  },
  firstOpponentCheckBoxes: {
    flexDirection: "row",
    marginLeft: 8,
    marginTop: 20
  },
  secondOpponentCheckBoxes: {
    flexDirection: "row",
    marginLeft: 8,
    marginTop: 20
  },
  firstRowScoreResults: {
    flexDirection: "row",
    marginTop: 20
  },
  secondRowScoreResults: {
    flexDirection: "row",
    marginTop: 20
  },
  scoreResults: {
    flexDirection: "column",
    marginLeft: 8,
    marginTop: 20
  },
  scoreResult: {
    flexDirection: "row",
    marginLeft: 8,
    marginTop: 20,

  },
  firstRow: {
    height: 185,
    flexDirection: "column",
    marginLeft: 8,
    marginTop: 18
  },
});

export default MultiScoreCard;
