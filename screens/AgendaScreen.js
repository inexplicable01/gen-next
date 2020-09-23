import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  AsyncStorage,
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

  const [editmode, setEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {modeliststr,calendarnotes }= useSelector((state) => state.calendar);

  const daypressed = (dateobj) => {
    // console.log(dateobj);
    if (editmode) {
      dispatch(calendarActions.addIcon(dateobj));
    } else {
      dispatch(calendarActions.setdate(dateobj));
    }
  };

  const goEditMode = (modeliststr) => {
    // console.log(modeliststr.name)
    dispatch(calendarActions.setIcon(modeliststr));
    setModalVisible(false);
    setEditMode(true);
  };

  const saveNotes = async () => {
    // console.log('huh',checkselected(daynotesarr))
    const notes = JSON.stringify(calendarnotes);
    try {
      await AsyncStorage.setItem("CalendarNotes", notes);
    } catch (err) {
      console.log(err);
    }
    setEditMode(false);
  };

  return (
    <View style={styles.mainview}>
      <Header extrastyles={{ flex: 2 }} title={"Calendar"} />
      <View style={styles.calendarcomp}>
        <InfiScrollCalendar
          onDayPressed={daypressed}
          calendarstyle={{ flex: 8, width: "100%" }}
        />

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "orange" }}>
            {editmode
              ? "Edit Mode : Press date to add " + modeliststr.name
              : "  "}
          </Text>
        </View>

        <Notes
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          goEditMode={goEditMode}
          additionalstyle={{
            flex: 4,
            width: "80%"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignSelf:'flex-end',
            justifyContent: 'center',
            paddingBottom: 10
          }}
        >
          <TouchableOpacity
            style={[
              editmode
                ? {
                    ...styles.editbutton,
                    width: 120,
                    backgroundColor: "orange",
                  }
                : styles.editbutton,
            ]}
            onPress={() => {
              if (editmode) {
                saveNotes();
              } else {
                setModalVisible(true);
              }
            }}
          >
            <Text style={[editmode ? { fontSize: 30 } : { fontSize: 50 }]}>
              {editmode ? "Done" : "+"}
            </Text>
          </TouchableOpacity>
        </View>
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
  editbutton: {
    height: 60,
    width: 80,
    backgroundColor: "#FF89DE",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    // borderRightWidth:2,
    // borderRightColor:'black'
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
