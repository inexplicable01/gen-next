import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

const CurrentDayText = (props) => {
  
    const calendar = useSelector((state) => state.calendar);

    return (
    <Text style={{ fontSize: 20, textAlign: "center", marginTop: 5 }}>
      Notes: {calendar.selected}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default CurrentDayText;
