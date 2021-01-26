import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";

import PropTypes from "prop-types";
import _ from "lodash";
import SelectMultipleButton from "./SelectMultipleButton";

const ios_blue = "#007AFF";

const SelectMultipleGroupButton = (props) => {
  const [multipleSelecteData, setMultipleSelectedData] = useState([])
  const [radioSelectedData, setRadioSelectedData] = useState("")

  useEffect(() => {
    if (props.defaultSelectedIndexes !== undefined) {
      if (props.multiple) {
        props.defaultSelectedIndexes.map(item => {
          var defaultSelectedValue = props.group[item].value;
          multipleSelectedData.push(defaultSelectedValue);
        });
        setMultipleSelectedData(multipleSelectedData);
      } else {
        var idx = props.defaultSelectedIndexes[0];
        if (idx !== undefined) {
          setRadioSelectedData(props.group[idx].value);
        }
      }
    }
  }, [])

  const singleTapMultipleSelectedButtons = (valueTap) => {
    if (props.multiple) {
      if (multipleSelectedData.includes(valueTap)) {
        _.remove(multipleSelectedData, item => {
          return item === valueTap;
        });
      } else {
        if (props.maximumNumberSelected !== undefined) {
          if (
            multipleSelectedData.length <
            props.maximumNumberSelected
          ) {
            multipleSelectedData.push(valueTap);
          }
        } else {
          multipleSelectedData.push(valueTap);
        }
      }

      props.onSelectedValuesChange(multipleSelectedData);

      setMultipleSelectedData(multipleSelectedData);
    } else {
      props.onSelectedValuesChange([valueTap]);
      setRadioSelectedData(valueTap);
    }

    props.singleTap(valueTap);
  }

  const selectedStatus = (value) => {
    if (props.multiple) {
      return multipleSelectedData.includes(value);
    } else {
      return radioSelectedData === value;
    }
  }

  return (
    <View style={[styles.containerView, props.containerViewStyle]}>
      {props.group.map((ele, index) => (
        <SelectMultipleButton
          key={ele.value + index}
          buttonViewStyle={props.buttonViewStyle}
          textStyle={props.textStyle}
          highLightStyle={props.highLightStyle}
          multiple={props.multiple}
          value={ele.value}
          displayValue={ele.displayValue}
          selected={() => selectedStatus(ele.value)}
          singleTap={valueTap =>
            singleTapMultipleSelectedButtons(valueTap)
          }
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  }
});

SelectMultipleGroupButton.propTypes = {
  multiple: PropTypes.bool,
  defaultSelectedIndexes: PropTypes.arrayOf(PropTypes.number),

  maximumNumberSelected: function (props, propName, componentName) {
    let value = props[propName];
    if (value === undefined) {
      return null;
    }
    // console.log(propName + " " + value + " " + typeof value);
    if (typeof value !== "number") {
      return new Error(
        "Invalid prop `" +
        propName +
        "` supplied to `" +
        componentName +
        ", excepted `number`"
      );
    }
    if (value < 2) {
      return new Error(
        "Invalid prop `" +
        propName +
        "` supplied to" +
        " `" +
        componentName +
        "`, " +
        propName +
        "'s minimum value is 2."
      );
    }

    return null;
  },

  group: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      displayValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired,

  highLightStyle: PropTypes.shape({
    borderColor: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    borderTintColor: PropTypes.string.isRequired,
    backgroundTintColor: PropTypes.string.isRequired,
    textTintColor: PropTypes.string.isRequired
  }),
  containerViewStyle: PropTypes.object,
  buttonViewStyle: PropTypes.object,
  textStyle: PropTypes.object,

  singleTap: PropTypes.func,
  onSelectedValuesChange: PropTypes.func
};

SelectMultipleGroupButton.defaultProps = {
  multiple: true,
  singleTap: valueTap => {},
  onSelectedValuesChange: selectedValues => {}
};

export default SelectMultipleGroupButton