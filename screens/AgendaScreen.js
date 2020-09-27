import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  AsyncStorage,
  Button
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/templates/Header";
// import { FlatList } from "react-native-gesture-handler";
import Notes from "../components/UI/Notes";

// import { MonthName, dateToCustomObject } from "../definitions/HMCalendarUtils";

import * as calendarActions from "../store/actions/calendar";
import InfiScrollCalendar from "../components/calendarutil/InfiScrollCalendar";


const AgendaScreen = (props) => {
  const dispatch = useDispatch();
  const [blah, setBlah ] = useState(true)
  // const [editmode, setEditMode] = useState(false);
  // const editmode = useRef(false)


  const {editmode, modeliststr,calendarnotes }= useSelector((state) => state.calendar);

  const daypressed = useCallback((dateobj) => {
      dispatch(calendarActions.setdate(dateobj));
  },[]);



  return (
    <View style={styles.mainview}>
      <Header extrastyles={{ flex: 2 }} title={"Calendar"} />
      <View style={styles.calendarcomp}>
        <InfiScrollCalendar
          onDayPressed={daypressed}
          calendarstyle={{ flex: 18, width: "100%" }}
        />

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "orange" }}>
            {editmode
              ? "Edit Mode : Press date to add " + modeliststr.name
              : "  "}
          </Text>
        </View>

        <Notes
          editmode = {editmode}
          // setEditMode = {setEditMode}
          additionalstyle={{
            flex: 6,
            width: "100%"
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  calendarcontain: {
    flex: 8,
    width: "100%",
    backgroundColor: "black",
    borderColor: "green",
    // borderWidth: 4,
    // borderRadius: 10,
  },

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
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});

export default AgendaScreen;
