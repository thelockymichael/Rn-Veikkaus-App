import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
// import MaterialCheckbox from "./components/MaterialCheckbox";
// import MaterialCheckboxWithLabel from "./components/MaterialCheckboxWithLabel";

// import { ToggleButton } from "react-native-paper"

import Colors from "../../../constants/Colors"

// Toggle Button
import ToggleButton from "./ToggleButton"



const MultiScoreCard = (props) => {
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
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <ToggleButton
                number={item}
              />
            ))}



          </View>
          <Text style={styles.secondOpponent}>Florentina</Text>
          <View style={styles.secondOpponentCheckBoxes}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <ToggleButton
                number={item}
              />
            ))}
          </View>
        </View>
        <View style={styles.scoreResults}>
          <View style={styles.firstRowScoreResults}>
            <View style={styles.scoreResult}>
              <ToggleButton
                checked
              />
              <Text>Ei kotivoittoja</Text>
            </View>
            <View style={styles.scoreResult}>
              <ToggleButton
                checked
              />
              <Text>Ei tasapelejä</Text>
            </View>
          </View>
          <View style={styles.secondRowScoreResults}>
            <View style={styles.scoreResult}>
              <ToggleButton
                checked
              />
              <Text>Ei vierasvoittoja</Text>
            </View>
          </View>
        </View>
      </View>
    </View >

    /* <MaterialCheckbox
    //             style={styles.materialCheckbox5}
    //           ></MaterialCheckbox>
    //           <MaterialCheckbox
    //             style={styles.materialCheckbox1}
    //           ></MaterialCheckbox>
    //           <MaterialCheckbox
    //             style={styles.materialCheckbox2}
    //           ></MaterialCheckbox>
    //           <MaterialCheckbox
    //             style={styles.materialCheckbox4}
    //           ></MaterialCheckbox>
    //           <MaterialCheckbox
    //             style={styles.materialCheckbox6}
    //           ></MaterialCheckbox>
    //           <MaterialCheckbox
    //             style={styles.materialCheckbox7}
    //           ></MaterialCheckbox>
    //           <MaterialCheckbox
    //             style={styles.materialCheckbox8}
    //           ></MaterialCheckbox>
    //           <MaterialCheckbox
    //             style={styles.materialCheckbox9}
    //           ></MaterialCheckbox> */
    //         </View>
    //         {/* <MaterialCheckbox
    //           style={styles.materialCheckbox}
    //         ></MaterialCheckbox> */}
    //       </View>
    //       <Text style={styles.florentina}>Florentina</Text>
    //       <View style={styles.materialCheckbox10StackStackStack}>
    //         <View style={styles.materialCheckbox10StackStack}>
    //           <View style={styles.materialCheckbox10Stack}>
    //             {/* <MaterialCheckbox
    //               style={styles.materialCheckbox10}
    //             ></MaterialCheckbox>
    //             <MaterialCheckbox
    //               style={styles.materialCheckbox17}
    //             ></MaterialCheckbox> */}
    //           </View>
    //           <View style={styles.materialCheckbox12Stack}>
    //             {/* <MaterialCheckbox
    //               style={styles.materialCheckbox12}
    //             ></MaterialCheckbox>
    //             <MaterialCheckbox
    //               style={styles.materialCheckbox13}
    //             ></MaterialCheckbox>
    //             <MaterialCheckbox
    //               style={styles.materialCheckbox15}
    //             ></MaterialCheckbox>
    //             <MaterialCheckbox
    //               style={styles.materialCheckbox16}
    //             ></MaterialCheckbox> */}
    //           </View>
    //         </View>
    //         <View style={styles.materialCheckbox11Stack}>
    //           {/* <MaterialCheckbox
    //             style={styles.materialCheckbox11}
    //           ></MaterialCheckbox>
    //           <MaterialCheckbox
    //             style={styles.materialCheckbox14}
    //           ></MaterialCheckbox>
    //           <MaterialCheckbox
    //             style={styles.materialCheckbox18}
    //           ></MaterialCheckbox> */}
    //         </View>
    //       </View>
    //     </View>
    //     <View style={styles.materialCheckboxWithLabelStackRow}>
    //       <View style={styles.materialCheckboxWithLabelStack}>
    //         {/* <MaterialCheckboxWithLabel
    //           style={styles.materialCheckboxWithLabel}
    //         ></MaterialCheckboxWithLabel>
    //         <MaterialCheckboxWithLabel
    //           style={styles.materialCheckboxWithLabel2}
    //         ></MaterialCheckboxWithLabel> */}
    //       </View>
    //       {/* <MaterialCheckboxWithLabel
    //         style={styles.materialCheckboxWithLabel1}
    //       ></MaterialCheckboxWithLabel>
    //       <MaterialCheckboxWithLabel
    //         style={styles.materialCheckboxWithLabel3}
    //       ></MaterialCheckboxWithLabel> */}
    //     </View>
    //   </View>
    // </View>

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
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // width: 348,
    // height: 254
  },

  opponentTitles: {
    fontFamily: "roboto-700",
    color: "rgba(2,60,142,1)",
    height: 17,
    width: 123,
    marginLeft: 8
  },
  firstOpponent: {
    fontFamily: "roboto-regular",
    color: "rgba(2,60,142,1)",
    marginTop: 20,
    marginLeft: 8
  },
  secondOpponent: {
    fontFamily: "roboto-regular",
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
