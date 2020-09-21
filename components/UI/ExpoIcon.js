import React from "react";
import {  StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AntDesign, MaterialCommunityIcons,FontAwesome5,Fontisto ,Entypo} from "@expo/vector-icons";

const ExpoIcon = (props) => {
  if (props.iconfamily === "AntDesign") {
    return (
      <AntDesign
        name={props.name}
        style={styles.iconstyle}
        size={props.size}
        color={props.color}
      />
    );
  } else if (props.iconfamily === "FontAwesome5") {
    return (
      <FontAwesome5
        name={props.name}
        style={styles.iconstyle}
        size={props.size}
        color={props.color}
      />
    );
  }else if (props.iconfamily === "MaterialCommunityIcons") {
    return (
      <MaterialCommunityIcons
        name={props.name}
        style={styles.iconstyle}
        size={props.size}
        color={props.color}
      />
    );
  }else if (props.iconfamily === "Fontisto") {
    return (
      <Fontisto
        name={props.name}
        style={styles.iconstyle}
        size={props.size}
        color={props.color}
      />
    );
  }else if (props.iconfamily === "Entypo") {
    return (
      <Entypo
        name={props.name}
        style={styles.iconstyle}
        size={props.size}
        color={props.color}
      />
    );
  }else if (props.iconfamily === "AntDesign") {
    return (
      <AntDesign
        name={'question'}
        style={styles.iconstyle}
        size={props.size}
        color={props.color}
      />
    );
  }
};

const styles = StyleSheet.create({
  headertext: {
    fontSize: 16,
  },
});

export default ExpoIcon;
