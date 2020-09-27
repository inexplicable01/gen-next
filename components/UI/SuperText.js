import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { notescaldefinition } from "../../definitions/Notices";
import Icon from "react-native-vector-icons/FontAwesome5";
import { iconsFromNotes } from "../../definitions/Notices";
import ExpoIcon from "../../components/UI/ExpoIcon";
import SuperSubText from "../../components/UI/SuperSubText";
const SuperText = (props) => {
  console.log(props.text);
  return (
    <View>
      <Text style={props.blue ? { color: "white" } : { color: "black" }}>
        {props.text}
      </Text>
      {/* <SuperSubText
        deeper={props.deeper}
        value={props.deeper[props.text]}
        tfitem={props.tfitem}
        trigger={props.tfitem[1]}
        text = {props.text}
      /> */}
    </View>
  );
};

export default React.memo(SuperText);
