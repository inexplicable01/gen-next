import React, { useRef, useState } from "react";
import { View, Text} from "react-native";

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
