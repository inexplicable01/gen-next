import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,  Button,AsyncStorage } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import NoteText from "../UI/NoteText";
import MedicineModal from "../UI/MedicineModal";

const CurrentDayText = (props) => {
  const calendar = useSelector((state) => state.calendar);
  
  const saveNotes = async () => {
    // console.log('huh',checkselected(daynotesarr))
    const notes = JSON.stringify(calendar.calendarnotes);
    try {
      await AsyncStorage.setItem("CalendarNotes", notes);
    } catch (err) {
      console.log(err)
    }
    props.setEditMode(false)
  };

  
  return (
    <View style={{ ...props.additionalstyle, ...styles.notescontainer }}>
      <MedicineModal
        modalVisible={props.modalVisible}
        goEditMode = {props.goEditMode}
        setModalVisible={props.setModalVisible}
      />
      <Text style={{ fontSize: 20, textAlign: 'left', marginTop: 5 }}>
        {calendar.selected}
      </Text>
      <View style={styles.notescontentcontainer}>
        <TouchableOpacity
          onPress={() => {
            props.setModalVisible(true);
          }}
        >
          {calendar.selected in calendar.calendarnotes ? (
            <NoteText
              textarray={[
                ...calendar.calendarnotes[calendar.selected],
                "Edit Notes",
              ]}
            />
          ) : (
            <NoteText textarray={["Add Notes"]} />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          // backgroundColor: "blue",
        }}
      >

        <TouchableOpacity
          style={[ props.editmode? {...styles.editbutton,width: 120, backgroundColor:'orange'}:styles.editbutton]}
          onPress={() => {
            if (props.editmode){
              saveNotes()
              

            }else{
              props.setModalVisible(true);
            }
          }}
        >
          <Text style={[props.editmode?{ fontSize: 30 }:{ fontSize: 50 }]}>{props.editmode?'Done':'+'}</Text>
        </TouchableOpacity>
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
    margin: 10,
    alignSelf: "flex-start",
  },
  editbutton:{
    height: 60,
    width: 80,
    backgroundColor: '#FF89DE',
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
    // borderRightWidth:2,
    // borderRightColor:'black'
  }
});

export default CurrentDayText;
