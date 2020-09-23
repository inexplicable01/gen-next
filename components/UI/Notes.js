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

const Notes = (props) => {
  const calendar = useSelector((state) => state.calendar);
  const displaydate = (selected) => {
    const [year, month, day] = selected.split("-");
    const displaystr =
      fullmonth[MonthName[parseInt(month) - 1]] + " " + day + ", " + year;
    return displaystr;
  };

  return (
    <View style={{ ...props.additionalstyle, ...styles.notescontainer }}>
      <MedicineModal
        modalVisible={props.modalVisible}
        goEditMode={props.goEditMode}
        setModalVisible={props.setModalVisible}
      />
      <Text style={{ fontSize: 20, textAlign: "left", marginTop: 5 , textDecorationLine:'underline'}}>
        {displaydate(calendar.selected)}
      </Text>
      <View style={styles.notescontentcontainer}>
        {calendar.calendarnotes[calendar.selected]?        <NoteText
          textarray={[
            ...calendar.calendarnotes[calendar.selected]
          ]}
        />: null
          
        }

      </View>


      {/* <Button title='notes'  onPress={()=>{console.log(calendar.calendarnotes)}}/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
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
