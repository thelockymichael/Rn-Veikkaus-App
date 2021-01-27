import React, {
  useState
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import SelectMultipleButton from "../components/UI/SelectMultipleButton"
import SelectMultipleGroupButton from "../components/UI/SelectMultipleGroupButton"

// Colors
import Colors from "../constants/Colors"

const DrawsScreen = ({ navigation }) => {
  const [selectedDraw, setSelectedDraw] = useState("Multiscore")


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
          singleTap={valueTap => setSelectedDraw(valueTap)}

        // switch (valueTap) {
        //   case "Multiscore":
        //     console.log("SimpleBtn");
        //     break;
        //   case "Score":
        //     console.log("GroupBtn");

        //     break;
        //   case "Sport":
        //     console.log("Segment");

        //     break;
        //   case "Winner":
        //     console.log("List");

        //     break;
        //   default:
        //     break;
        // }

        // buttonViewStyle={{ flex: 1, margin: 0, borderRadius: 0 }}
        // highLightStyle={{
        //   borderColor: Colors.primaryColor,
        //   textColor: Colors.primaryColor,
        //   backgroundColor: Colors.accentColor,
        //   borderTintColor: Colors.primaryColor,
        //   textTintColor: "white",
        //   backgroundTintColor: Colors.primaryColor
        // }}
        />
      </View>
      <Text>DrawsScreen</Text>
    </View>
  );
};

export default DrawsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
