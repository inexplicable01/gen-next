import React, { useRef, useState } from "react";
import { View, Text} from "react-native";

const SuperText = (props) => {
  // console.log(props.text);
  return (
    <View>
      <Text style={props.schedule==props.text ? { color: "white" } : { color: "black" }}>
        {props.text}
      </Text>
    </View>
  );
};

export default React.memo(SuperText);
