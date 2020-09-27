import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { notescaldefinition } from "../../definitions/Notices";
import Icon from "react-native-vector-icons/FontAwesome5";
import { iconsFromNotes } from "../../definitions/Notices";
import ExpoIcon from "../../components/UI/ExpoIcon";

const SuperSubText = (props) => {
  var weeks = [];
  // console.log('supersbub', props.text)
  for (const yeah of props.tfitem) {
    // console.log(props.notesmonth['week' + iweek])
    weeks.push(
      <Text key ={Math.random()}>
        {yeah}
      </Text>
    );
  }
  return (
    <View style={{flexDirection:'row'}}>
        {weeks}
    </View>
  );
};


export default React.memo(SuperSubText);