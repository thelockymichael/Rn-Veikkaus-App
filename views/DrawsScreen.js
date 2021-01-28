import React, {
  useState
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Dimensions
} from 'react-native';

import moment from "moment"

import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import * as gamesActions from '../store/actions/games'

import SelectMultipleGroupButton
  from "../components/UI/SelectMultipleGroupButton"

// Colors
import Colors from "../constants/Colors"

import { TabView, SceneMap } from 'react-native-tab-view';

const MultiscoreRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const ScoreRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const SportRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#088a6d' }]} />
);

const WinnerRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#f07853' }]} />
);

const PickTwoRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#99bb54' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

const DrawsScreen = ({ navigation }) => {
  const [selectedDraw, setSelectedDraw] = useState("Multiscore")

  const draws = useSelector((state) => state.games.draws)

  console.log(draws);

  const dispatch = useDispatch()

  const itemsExample = [
    {
      id: 1,
      content: "Hello"
    },
    {
      id: 2,
      content: "Hello"
    },
    {
      id: 3,
      content: "Hello"
    },
    {
      id: 4,
      content: "Hello"
    },
  ]

  console.log(selectedDraw);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'multiscore', title: 'Multiscore' },
    { key: 'score', title: 'Score' },
    { key: 'sport', title: 'Sport' },
    { key: 'winner', title: 'Winner' },
    { key: 'pickTwo', title: 'Pick-Two' },
  ]);

  // { value: "Multiscore" },
  //             { value: "Score" },
  //             { value: "Sport" },
  //             { value: "Winner" },
  //             { value: "Pick-Two" },
  //             { value: "Pick-Three" },
  //             { value: "Perfecta" },
  //             { value: "Trifecta" },
  //             { value: "Ebet" },
  //             { value: "Ravi" },

  const renderScene = SceneMap({
    multiscore: MultiscoreRoute,
    score: ScoreRoute,
    sport: SportRoute,
    winner: WinnerRoute,
    pickTwo: PickTwoRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />

  )
}
//   return (
//     <View
//       style={styles.container}
//     >
//       <View style={{ marginTop: 20 }}>
//         <SelectMultipleGroupButton
//           multiple={false}
//           group={[
//             { value: "Multiscore" },
//             { value: "Score" },
//             { value: "Sport" },
//             { value: "Winner" },
//             { value: "Pick-Two" },
//             { value: "Pick-Three" },
//             { value: "Perfecta" },
//             { value: "Trifecta" },
//             { value: "Ebet" },
//             { value: "Ravi" },
//           ]}
//           defaultSelectedIndexes={[0]}
//           // singleTap={valueTap => setSelectedDraw(valueTap)}
//           singleTap={async (valueTap) => {
//             await dispatch(gamesActions.getDraws(valueTap.toUpperCase()))


//           }}
//         />
//       </View>
//       <Text>DrawsScreen</Text>
//       <Text>DrawsScreen</Text>
//       <FlatList
//         data={draws}
//         renderItem={itemData => (
//           <View>
//             <Text>{itemData.item.status}</Text>
//             <Text>{itemData.item.status}</Text>
//             <Text>Open time: {moment(itemData.item.openTime).format("DD MMM YYYY hh:mm a")}</Text>
//             <Text>Close time: {moment(itemData.item.closeTime).format("DD MMM YYYY hh:mm a")}</Text>
//             <Text>Results available time: {moment(itemData.item.resultsAvailableTime).format("DD MMM YYYY hh:mm a")}</Text>
//             <Text>{"==========ROWS========="}</Text>
//             {itemData.item.rows.map(item => (
//               <Text>{item.name}</Text>
//             ))}

//             <Text>{"==========================="}</Text>

//           </View>
//         )}
//       />
//     </View>
//   );
// };

export default DrawsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1
  }
})
