import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { notescaldefinition } from "../../definitions/Notices";

const findcolor = (word) => {
  for (const notice of Object.keys(notescaldefinition)) {
    if (notescaldefinition[notice].liststr.includes(word)) {
      return notescaldefinition[notice].dotdef.color;
    }
  }
  return 'gainsboro'
};

const NoteText = (props) => {
  const textarray = [];
    // console.log('textarray', props.textarray)
  for (const word of props.textarray) {
    textarray.push(
      <View
        key={word}
        style={{
          ...styles.mainview,
          backgroundColor: findcolor(word),
          margin: 5,
          padding: 5,
            borderRadius:5,
        }}
      >
        <Text style={{ fontSize: 16 }}> {word}</Text>
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>{textarray}</View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  //   mainview: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
});

export default NoteText;