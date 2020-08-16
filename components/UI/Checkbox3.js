import React, { useState } from "react";
import { View, Text, StyleSheet, CheckBox ,TouchableOpacity} from "react-native";
import { notescaldefinition } from "../../definitions/Notices";

const Checkbox3 = (props) => {
  //limits to 3
  const lines = Math.ceil(props.data.length / 3);
  //   console.log("props.data.length", props.data.length);
  var checkline = [];
//   console.log("data", props.data);
  for (let i = 0; i < lines; i++) {
    if (i < lines - 1) {
      checkline.push(
        <LineCheck3
          downselecteddata={props.data.slice(i * 3, i * 3 + 3)}
          key={i}
          checkedchange={props.checkedchange}
          notice={props.notice}
        />
      );
    } else {
      checkline.push(
        <LineCheck3
          downselecteddata={props.data.slice(i * 3, props.data.length)}
          key={i}
          checkedchange={props.checkedchange}
          notice={props.notice}
        />
      );
    }
  }
  return <View>{checkline}</View>;
};

const LineCheck3 = (props) => {
  var checks = [];
  const numofcheckbox = props.downselecteddata.length;
  for (let i = 0; i < numofcheckbox; i++) {
    checks.push(
      <IndivCheckBox
        liststr={props.downselecteddata[i].liststr}
        checkedchange={props.checkedchange}
        notice={props.notice}
        checked={props.downselecteddata[i].checked}
        key={i}
      />
    );
  }

  return <View style={styles.checkboxContainer}>{checks}</View>;
};

const IndivCheckBox = (props) => {

    const color = props.checked? 'white': notescaldefinition[props.notice].dotdef.color
  return (
    <View style={{...styles.checkboxContainer3}}>
      <TouchableOpacity
        onPress={() => {
            props.checkedchange(props.notice, props.liststr);
          }}
        style={styles.checkbox3}
        activeOpacity={0.2}
      >
        <CheckBox
          value={props.checked}
          onValueChange={() => {
            props.checkedchange(props.notice, props.liststr);
          }}
          style={styles.checkbox}
        />
        <Text style={styles.label}>{props.liststr}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
    // backgroundColor: "purple",
  },
  checkboxContainer3: {
    flex: 1,
    flexDirection: "row",
    borderRadius:5,

    // marginBottom: 5,
    // backgroundColor: "green",
    alignItems: "center",
  },
  checkbox3:{
    flexDirection: "row",
    alignItems: "center",
  }
});

export default Checkbox3;
