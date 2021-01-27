import React, {
  useState
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList
} from 'react-native';

import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import * as gamesActions from '../store/actions/games'

import SelectMultipleGroupButton from "../components/UI/SelectMultipleGroupButton"

// Colors
import Colors from "../constants/Colors"

const DrawsScreen = ({ navigation }) => {
  const [selectedDraw, setSelectedDraw] = useState("Multiscore")

  const draws = useSelector((state) => state.games.draws)

  console.log(draws);

  const dispatch = useDispatch()

  console.log(selectedDraw);
  return (
    <View
      style={styles.container}
    >
      <View style={{ marginTop: 20 }}>
        <SelectMultipleGroupButton
          multiple={false}
          group={[
            { value: "Multiscore" },
            { value: "Score" },
            { value: "Sport" },
            { value: "Winner" },
            { value: "Pick-Two" },
            { value: "Pick-Three" },
            { value: "Perfecta" },
            { value: "Trifecta" },
            { value: "Ebet" },
            { value: "Ravi" },
          ]}
          defaultSelectedIndexes={[0]}
          // singleTap={valueTap => setSelectedDraw(valueTap)}
          singleTap={async (valueTap) => {
            await dispatch(gamesActions.getDraws(valueTap.toUpperCase()))


          }}
        />
      </View>
      <Text>DrawsScreen</Text>
      <FlatList

      />
    </View>
  );
};

export default DrawsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
