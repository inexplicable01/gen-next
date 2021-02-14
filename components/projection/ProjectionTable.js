import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Button,
  AsyncStorage,
} from "react-native";

import TableRow from "../../components/table/TableRow";
import TablePeriodRow from "../../components/table/TablePeriodRow";
import { projectionMatrix } from "../../definitions/ProjectionUtils";
import { useNavigation } from "@react-navigation/native";
import * as calendarActions from "../../store/actions/calendar";
import { MonthName, monthdate } from "../../definitions/HMCalendarUtils";
import Toast from "react-native-simple-toast";
import { IUISex, D3, D5, PERIOD } from "../../definitions/Notices";
import { useDispatch, useSelector } from "react-redux";

const ProjectionTable = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { sumcycle, ave_cycle, startendovutime } = useSelector(
    (state) => state.personal
  );

  const markDates = async () => {
    dispatch(calendarActions.markdates(startendovutime, IUISex));
    navigation.navigate("Calendar");
    Toast.show("Filled in suggested days");
  };

  if (props.schedule == "Pregnancy") {
    return (
      <FlatList
        data={Object.keys(projectionMatrix[props.schedule])}
        keyExtractor={(item, index) => "" + index}
        renderItem={({ item }) => (
          <TableRow
            entry={projectionMatrix[props.schedule][item].label}
            fields={addDays(
              projectionMatrix[props.schedule][item].days,
              props.curdateobj
            )}
            rowstyle={{ borderBottomWidth: 8 }}
          />
        )}
        style={{ width: "100%" }}
      />
    );
  }
  if (props.schedule == "Cycle") {
    if (Object.keys(sumcycle).length > 0) {
      // console.log('sume',sumcycle)
      return (
        <View style={styles.dataview}>
          <View
            style={{
              flex: 8,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FlatList
              data={Object.keys(sumcycle)}
              keyExtractor={(item, index) => "" + index}
              renderItem={({ item }) => (
                <TablePeriodRow
                  monthyear={item}
                  monthdaycount={sumcycle[item]["count"]}
                  monthstartend={
                    monthdate(sumcycle[item]["periodstartdate"]) +
                    " - " +
                    monthdate(sumcycle[item]["periodenddate"])
                  }
                />
              )}
              style={{ width: "100%" }}
            />
          </View>

          { (ave_cycle) ? (
            <View
              style={{
                justifyContent: "space-evenly",
                alignContent: "center",
                // backgroundColor: "blue",
                flex: 4,
              }}
            >
              <Text style={styles.text}>
                Your average cycle is {ave_cycle} days
              </Text>
              <Text style={styles.text}>
                Your next ovu days are from {MM_DD_fromtime(startendovutime[0])}{" "}
                to {MM_DD_fromtime(startendovutime[startendovutime.length - 1])}
              </Text>
              <Button title="Mark dates on calendar" onPress={markDates} />
            </View>
          ) : (
            <View
              style={{
                justifyContent: "space-evenly",
                alignContent: "center",
                // backgroundColor: "blue",
                flex: 4,
              }}
            >
              <Text> Not enough data to make projections yet. </Text>
              <Text>Please enter more cycle data. </Text>
            </View>
          )}
        </View>
      );
    }
    return <Text> Please go enter some period data</Text>;
  }
};

const MM_DD_fromtime = (timestamp) => {
  const dateobj = new Date(timestamp);
  return MonthName[dateobj.getMonth()] + " " + dateobj.getDate();
};

const addDays = (days, dateobj) => {
  const newtime = dateobj.getTime() + 60 * 60 * 24 * 1000 * days;
  const newdateobj = new Date(newtime);
  return newdateobj.toDateString();
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  projecttext: {
    fontSize: 16,
    alignSelf: "center",
  },
  dataview: {
    flex: 12,
    // marginTop: 20,
    alignItems: "center",
    width: "100%",
    // borderWidth: 2,
    // backgroundColor: "yellow",
    justifyContent: "space-around",
    alignItems: "center",
    // marginTop: 20,
    // borderWidth: 2,
  },
  projecttable: {
    width: "100%",
    alignItems: "flex-start",
    // backgroundColor: "yellow",
    borderRadius: 10,
    // borderWidth:2,
    padding: 5,
  },
  projectionnbox: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    // borderColor: "black",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 20,
    margin: 10,
    height: 60,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProjectionTable;
