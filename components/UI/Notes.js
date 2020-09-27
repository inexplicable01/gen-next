import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  AsyncStorage,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import NoteText from "../UI/NoteText";
import MedicineModal from "../UI/MedicineModal";
import {
  MonthName,
  dateToCustomObject,
  monthdaysinyear,
  weekdaynames,
  fullmonth,
} from "../../definitions/HMCalendarUtils";
import * as calendarActions from "../../store/actions/calendar";

const Notes = (props) => {
  const calendar = useSelector((state) => state.calendar);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const displaydate = (selected) => {
    const [year, month, day] = selected.split("-");
    const displaystr =
      fullmonth[MonthName[parseInt(month) - 1]] + " " + day + ", " + year;
    return displaystr;
  };

  const goEditMode = (modeliststr) => {
    // console.log(modeliststr.name)
    dispatch(calendarActions.setIcon(modeliststr));
    dispatch(calendarActions.setEditMode(true))
    setModalVisible(false);
    // props.setEditMode(true);
  };

  const saveNotes = async () => {
    // console.log('huh',checkselected(daynotesarr))
    const notes = JSON.stringify(calendar.calendarnotes);
    try {
      await AsyncStorage.setItem("CalendarNotes", notes);
    } catch (err) {
      console.log(err);
    }
    dispatch(calendarActions.setEditMode(false));
  };
  return (
    <View style={{ ...props.additionalstyle, ...styles.notescontainer }}>
      <MedicineModal
        modalVisible={modalVisible}
        goEditMode={goEditMode}
        setModalVisible={setModalVisible}
      />
      <View style={{width:'80%', alignSelf:'center'}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            marginTop: 5,
            textDecorationLine: "underline",
          }}
        >
          {displaydate(calendar.selected)}
        </Text>
        <View style={styles.notescontentcontainer}>
          {calendar.calendarnotes[calendar.selected] ? (
            <NoteText
              textarray={[...calendar.calendarnotes[calendar.selected]]}
            />
          ) : null}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-end",
          justifyContent: "center",
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          style={[
            calendar.editmode
              ? {
                  ...styles.editbutton,
                  width: 120,
                  backgroundColor: "orange",
                }
              : styles.editbutton,
          ]}
          onPress={() => {
            if (calendar.editmode) {
              saveNotes();
            } else {
              setModalVisible(true);
            }
          }}
        >
          <Text style={[calendar.editmode ? { fontSize: 30 } : { fontSize: 50 }]}>
            {calendar.editmode ? "Done" : "+"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
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
  notescontentcontainer: {
    flex: 4,
    margin: 20,
    alignSelf: "flex-start",
  },
  notescontainer: {
    // margin: 10,
    // backgroundColor: "yellow",
  },
});

export default Notes;
