import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Header from "../components/templates/Header";
import AgendaComp from "../components/UI/AgendaComp";

const CalendarScreen = (props) => {
  const calendar = useSelector((state) => state.calendar);

  return (
    <View style={styles.mainview}>
      <Header extrastyles={{ flex: 1 }} />
      <Text>Current Date: {calendar.currentdate}</Text>
      <View style={styles.calendarcomp}>
        <AgendaComp />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  mainview: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
  },
  calendarcomp: {
    width: "100%",
    borderWidth: 2,
    backgroundColor:'yellow',
    flex: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CalendarScreen;
