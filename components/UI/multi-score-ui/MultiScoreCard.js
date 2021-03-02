import React, { useReducer, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';

import Colors from '../../../constants/Colors';

// Redux
import * as playGamesActions from '../../../store/actions/playgames';

// Form Buttons
import ToggleButton from './ToggleButton';
import AddSubtractBtn from './AddSubtractButton';

import { useDispatch } from 'react-redux';

const scoreArray = [
  { number: 1, selected: false },
  { number: 2, selected: false },
  { number: 3, selected: false },
  { number: 4, selected: false },
  { number: 5, selected: false },
  { number: 6, selected: false },
  { number: 7, selected: false },
  { number: 8, selected: false },
];

const formReducer = (state, action) => {
  // console.log("state", state);
  // console.log("action", action);
  // console.log("[action.input]", action.input);

  const postValues = {
    ...state.inputValues,
    [action.input]: action.value,
  };

  return {
    ...state,
    inputValues: postValues,
  };
};

const MultiScoreCard = (props) => {
  const dispatch = useDispatch();

  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstScoreArr: scoreArray,
      secondScoreArr: scoreArray,
      noAwayWins: false,
      noDrawWins: false,
      noHomeWins: false,
      priceWager: 5,
    },
    // inputValidities: {},
    // formIsValid: false
  });

  const handleFirstToggle = (inputIdentifier, selectedItem) => {
    const newArr = formState.inputValues.firstScoreArr.map((item) => {
      // console.log("Item", item)
      // console.log("SelectedItem", selectedItem)
      if (item.number == selectedItem.number) {
        // console.log("Set new item to false or true.");
        return {
          number: item.number,
          selected: !selectedItem.selected,
        };
      } else {
        return item;
      }
    });

    // console.log("NEW ARR", newArr);
    // console.log("Input", inputIdentifier);

    // console.log("FINALLY", newArr);

    dispatchFormState({
      value: newArr,
      input: inputIdentifier,
    });
  };

  const handleSecondToggle = (inputIdentifier, selectedItem) => {
    const newArr = formState.inputValues.secondScoreArr.map((item) => {
      if (item.number == selectedItem.number) {
        return {
          number: item.number,
          selected: !selectedItem.selected,
        };
      } else {
        return item;
      }
    });

    dispatchFormState({
      value: newArr,
      input: inputIdentifier,
    });
  };

  const handleToggleOption = (inputIdentifier, state) => {
    dispatchFormState({
      value: state,
      input: inputIdentifier,
    });
  };

  // const [firstScoreArray, setFirstScoreArray] = useState([
  //   { number: 1, selected: false },
  //   { number: 2, selected: false },
  //   { number: 3, selected: false },
  //   { number: 4, selected: false },
  //   { number: 5, selected: false },
  //   { number: 6, selected: false },
  //   { number: 7, selected: false },
  //   { number: 8, selected: false },
  // ])

  // console.log("First Score Arr", firstScoreArray);

  // const [secondScoreArray, setSecondScoreArray] = useState([
  //   { number: 1, selected: false },
  //   { number: 2, selected: false },
  //   { number: 3, selected: false },
  //   { number: 4, selected: false },
  //   { number: 5, selected: false },
  //   { number: 6, selected: false },
  //   { number: 7, selected: false },
  //   { number: 8, selected: false },
  // ])

  // console.log("Second Score Arr", secondScoreArray);

  const [noDraws, setNoDraws] = useState(false);
  const [noHomes, setNoHomes] = useState(false);
  const [noAways, setNoAways] = useState(false);

  // console.log("Draws", noDraws);
  // console.log("Homes", noHomes);
  // console.log("Aways", noAways);

  const submitHandler = useCallback(async () => {
    console.log({
      noHomeWins: formState.inputValues.noHomeWins,
      noDrawWins: formState.inputValues.noDrawWins,
      noAwayWins: formState.inputValues.noAwayWins,
      firstScoreArr: formState.inputValues.firstScoreArr,
      secondScoreArr: formState.inputValues.secondScoreArr,
      priceWager: formState.inputValues.priceWager,
    });

    // setError(null);

    try {
      await dispatch(
        playGamesActions.playMultiscore({
          noHomeWins: formState.inputValues.noHomeWins,
          noDrawWins: formState.inputValues.noDrawWins,
          noAwayWins: formState.inputValues.noAwayWins,
          firstScoreArr: formState.inputValues.firstScoreArr,
          secondScoreArr: formState.inputValues.secondScoreArr,
          priceWager: formState.inputValues.priceWager,
        })
      );
    } catch (err) {
      Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
    }
  }, [formState]);

  const handlePriceWager = (inputIdentifier, state) => {
    dispatchFormState({
      value: state,
      input: inputIdentifier,
    });

    console.log('JOTAIN', inputIdentifier, state);
  };

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
            {formState.inputValues.firstScoreArr.map((item) => (
              <ToggleButton
                input="firstScoreArr"
                key={item.number}
                item={item}
                scoreHandler={handleFirstToggle}
              />
            ))}
          </View>
          <Text style={styles.secondOpponent}>Florentina</Text>
          <View style={styles.secondOpponentCheckBoxes}>
            {formState.inputValues.secondScoreArr.map((item) => (
              <ToggleButton
                input="secondScoreArr"
                key={item.number}
                item={item}
                scoreHandler={handleSecondToggle}
              />
            ))}
          </View>
        </View>
        <View style={styles.scoreResults}>
          <View style={styles.firstRowScoreResults}>
            <View style={styles.scoreResult}>
              <ToggleButton
                value={formState.inputValues.noHomeWins}
                input="noHomeWins"
                scoreHandler={handleToggleOption}
                checked
              />
              <Text>Ei kotivoittoja</Text>
            </View>
            <View style={styles.scoreResult}>
              <ToggleButton
                input="noDrawWins"
                scoreHandler={handleToggleOption}
                checked
              />
              <Text>Ei tasapelejä</Text>
            </View>
          </View>
          <View style={styles.secondRowScoreResults}>
            <View style={styles.scoreResult}>
              <ToggleButton
                input="noAwayWins"
                scoreHandler={handleToggleOption}
                checked
              />
              <Text>Ei vierasvoittoja</Text>
            </View>
          </View>
          <View>
            <View
              style={{
                marginTop: 20,
              }}
            >
              <AddSubtractBtn
                input="priceWager"
                wageHandler={handlePriceWager}
              />
            </View>
            <View
              style={{
                marginTop: 20,
              }}
            >
              <Button title="Maksa - €" onPress={submitHandler} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  container: {
    // NEW PROPERTIES
    width: 400,
    height: 500,
    // alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  opponentTitles: {
    color: 'rgba(2,60,142,1)',
    height: 17,
    width: 123,
    marginLeft: 8,
  },
  firstOpponent: {
    color: 'rgba(2,60,142,1)',
    marginTop: 20,
    marginLeft: 8,
  },
  secondOpponent: {
    color: 'rgba(2,60,142,1)',
    marginTop: 20,
    marginLeft: 8,
  },
  firstOpponentCheckBoxes: {
    flexDirection: 'row',
    marginLeft: 8,
    marginTop: 20,
  },
  secondOpponentCheckBoxes: {
    flexDirection: 'row',
    marginLeft: 8,
    marginTop: 20,
  },
  firstRowScoreResults: {
    flexDirection: 'row',
    marginTop: 20,
  },
  secondRowScoreResults: {
    flexDirection: 'row',
    marginTop: 20,
  },
  scoreResults: {
    flexDirection: 'column',
    marginLeft: 8,
    marginTop: 20,
  },
  scoreResult: {
    flexDirection: 'row',
    marginLeft: 8,
    marginTop: 20,
  },
  firstRow: {
    height: 185,
    flexDirection: 'column',
    marginLeft: 8,
    marginTop: 18,
  },
});

export default MultiScoreCard;
