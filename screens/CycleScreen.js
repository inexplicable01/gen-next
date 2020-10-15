import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/templates/Header";
// import { FlatList } from "react-native-gesture-handler";
import Notes from "../components/UI/Notes";

// import { MonthName, dateToCustomObject } from "../definitions/HMCalendarUtils";

const CycleScreen = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.mainview}>
      <Header extrastyles={{ flex: 2 }} title={"Your Cycle"} />
      <View style={styles.calendarcomp}>
        <View style={{ flex: 18, width: "100%" }} >

            <Text>Please enter some data for your period so we can start tracking</Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  calendarcomp: {
    width: "100%",
    // borderWidth: 2,
    backgroundColor: "#F7E5F2",
    flex: 20,
    // padding: 10,
    // height:500,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CycleScreen;
