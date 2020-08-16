import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MedicineModal from "../components/UI/MedicineModal";

import Header from "../components/templates/Header";
import CalendarComp from "../components/UI/CalendarComp";
import NoteText from "../components/UI/NoteText";

import * as calendarActions from "../store/actions/calendar";

const CalendarScreen = (props) => {
  const calendar = useSelector((state) => state.calendar);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("initiate data");
    initializeData();
  }, []);

  const initializeData = async () => {
    await dispatch(calendarActions.initiatecalendar());
  };

  console.log("why is useeffect");

  return (
    <View style={styles.mainview}>
      <Header extrastyles={{ flex: 1 }} title={"Calendar"} />

      <View style={styles.content}>
        {/* <Text >Current Date: {calendar.currentdate}</Text> */}
        <View style={{ flex: 8 }}>
          <CalendarComp />
        </View>
        <View style={styles.notescontainer}>
          <MedicineModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          {/* <Button title='print' onPress={()=> {console.log(calendar.calendarnotes)}}/> */}
          <Text style={{ fontSize: 20, textAlign: "center" , marginTop: 5}}>
            Notes: {calendar.selected}
          </Text>
          <View style={styles.notescontentcontainer}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              {calendar.selected in calendar.calendarnotes ? (
                <NoteText
                  textarray={[...calendar.calendarnotes[calendar.selected], 'Edit Notes']}
                />
              ) : (
                <NoteText textarray={["Add Notes"]} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },

  notescontainer: {
    flex: 4,
    margin: 20,
    alignSelf: "flex-start",
  },
  notescontentcontainer: {
    margin: 20,
  },
  mainview: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // borderWidth: 2,
  },
  content: {
    width: "100%",

    flex: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});

export default CalendarScreen;
