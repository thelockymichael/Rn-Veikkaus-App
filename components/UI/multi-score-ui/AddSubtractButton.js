import React, { useState } from 'react';

import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

import _ from '../../../utils/helpers';

const AddSubtractBtn = (props) => {
  const [priceWager, setPriceWager] = useState(20);

  const addToWager = () => {
    let tmp;

    if (priceWager < 100) {
      tmp = priceWager + 10;
    } else if (priceWager >= 100 && priceWager < 200) {
      tmp = priceWager + 20;
    } else if (priceWager >= 200) {
      tmp = priceWager + 100;
    }

    setPriceWager(tmp);

    props.wageHandler(props.input, tmp);
  };

  const subtractFromWager = () => {
    let tmp;
    if (priceWager >= 30 && priceWager <= 100) {
      tmp = priceWager - 10;
    } else if (priceWager > 100 && priceWager < 300) {
      tmp = priceWager - 20;
    } else if (priceWager >= 300) {
      tmp = priceWager - 100;
    } else {
      tmp = priceWager;
    }

    setPriceWager(tmp);

    props.wageHandler(props.input, tmp);
  };

  // const confirmInputHandler = () => {
  //   const chosenWager = parseInt(enteredValue)
  // }
  const numberInputHandler = (inputText) => {
    // let tmp = inputText * 100;

    // priceWager(inputText);

    // console.log(tmp);
    // if (tmp > 10000) {
    //   setPriceWager(100);
    // }

    setPriceWager(inputText.replace(/[^0-9]/g, ''));
  };

  return (
    <View style={styles.container}>
      <View style={styles.wager}>
        {/* <TextInput
          blurOnSubmit
          autoCapitalize="none"
          keyboardType="number-pad"
          maxLength={3}
          value={priceWager}
          onChangeText={numberInputHandler}

          // value={priceWager}
          // onChangeText={(text) => setPriceWager(text)}
        /> */}
        <Text style={styles.wagerText}>{_.divideByHundred(priceWager)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="-" onPress={subtractFromWager} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={addToWager} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    paddingHorizontal: 10,
  },
  wagerText: {
    color: 'white',
  },
  wager: {
    padding: 10,
    backgroundColor: '#15243c',
  },
});

export default AddSubtractBtn;
