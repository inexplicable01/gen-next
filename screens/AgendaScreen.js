import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/templates/Header";
// import { FlatList } from "react-native-gesture-handler";
import Notes from "../components/UI/Notes";

// import { MonthName, dateToCustomObject } from "../definitions/HMCalendarUtils";

import * as calendarActions from "../store/actions/calendar";
import InfiScrollCalendar from "../components/calendarutil/InfiScrollCalendar";
// import CurrentDayText from "../components/UI/CurrentDayText";

const AgendaScreen = (props) => {
  const dispatch = useDispatch();
  // const [listlength, setListlength] = useState(100);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [editmode, setEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const modeliststr = useSelector((state) => state.calendar.modeliststr);
  // const pan = useRef(new Animated.ValueXY()).current;

  // const rand = Math.floor(Math.random() * 6 + 1);

  const daypressed = (dateobj) => {
    // console.log(dateobj);
    if (editmode) {
      dispatch(calendarActions.addIcon(dateobj));
    } else {
      dispatch(calendarActions.setdate(dateobj));
    }
  };

  const TEXT_LENGTH = 40;
  const TEXT_HEIGHT = 14;
  const OFFSET = TEXT_LENGTH / 2 - TEXT_HEIGHT / 2;

  const goEditMode = (modeliststr) => {
    // console.log(modeliststr.name)
    dispatch(calendarActions.setIcon(modeliststr));
    setModalVisible(false);
    setEditMode(true);
  };

  return (
    <View style={styles.mainview}>
      <Header extrastyles={{ flex: 2 }} title={"Calendar"} />
      
      <View style={styles.calendarcomp}>
        <View style={editmode? {...styles.calendarcontain, borderColor:'red'}:styles.calendarcontain} pointerEvents={calendarLoading ? "none" : "auto"}>
          <InfiScrollCalendar
            onDayPressed={daypressed}
            setCalendarLoading={setCalendarLoading}
          />
        </View>
        {editmode ? (
          <View>
            <Text>Edit Mode : Press date to add {modeliststr.name}</Text>
          </View>
        ) : (
          <View>
            <Text>  </Text>
          </View>
        )}

        <Notes
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          goEditMode={goEditMode}
          editmode={editmode}
          setEditMode={setEditMode}
          additionalstyle={{
            flex: 4,
            width: "100%",
            paddingRight: 2,
            marginRight: 2,
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
    borderWidth: 4,
    borderRadius: 10,
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
    backgroundColor: "#F7E5F2",
    flex: 25,
    padding: 10,
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
