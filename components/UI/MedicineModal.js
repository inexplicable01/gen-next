import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  CheckBox,
  Button,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as calendarActions from "../../store/actions/calendar";
import { notescaldefinition } from "../../definitions/Notices";
// import Checkbox3 from "../../components/UI/Checkbox3";
import NoticeItem from "../../components/UI/NoticeItem";

let noticeOrders = new Array(Object.keys(notescaldefinition).length);

for (const notice of Object.keys(notescaldefinition)) {
  noticeOrders[notescaldefinition[notice].vieworder - 1] = notice;
}

const MedicineModal = (props) => {
  const calendar = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const [daynotesarr, setDayNoteArr] = useState({});

  useEffect(() => {
    const checksinfo = {};
    //   console.log("todaynotes", calendarnotes[selected]);
    Object.entries(notescaldefinition).map(([notice, notedef]) => {
      checksinfo[notice] = [];
      for (const liststr of notedef.liststr) {
        let checked = false;
        if (calendar.calendarnotes[calendar.selected]) {
          if (calendar.calendarnotes[calendar.selected].includes(liststr)) {
            checked = true;
          }
        }
        checksinfo[notice].push({
          liststr: liststr,
          checked: checked,
        });
      }
    });

    setDayNoteArr(checksinfo);
  }, [calendar.selected, props.modalVisible]);

 

  // const checkedchange = (notice, act) => {
  //   setDayNoteArr({
  //     ...daynotesarr,
  //     [notice]: daynotesarr[notice].map((item) => {
  //       if (item.liststr === act) {
  //         return { ...item, checked: !item.checked };
  //       } else {
  //         return item;
  //       }
  //     }),
  //   });
  // };


  //   console.log("day", daynotesarr);
  //  console.log(noticeOrders)
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modaltext}>
            Setting Notes for {calendar.selected}
          </Text>
          <FlatList
            data={noticeOrders}
            style={{
              width: "100%",
              borderRadius: 10,
              padding: 5,
            }}
            renderItem={(notice) => {
              // console.log(notescaldefinition[notice])
              return (
                <NoticeItem
                  notice={notice.item}
                  goEditMode = {props.goEditMode}
                  liststr={notescaldefinition[notice.item].liststr}
                  color={notescaldefinition[notice.item].dotdef.color}
                />
              );
            }}
            keyExtractor={(item) => item}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
          </View>
        </View>
      </View>
    </Modal>
  );
};

const checkselected = (daynotesarr) => {
  const checkselected = [];
  for (const notice of Object.keys(daynotesarr)) {
    for (const act of daynotesarr[notice]) {
      if (act.checked) {
        checkselected.push(act.liststr);
      }
    }
  }
  return checkselected;
};

const styles = StyleSheet.create({
  modaltext: {
    fontSize: 16,
  },
  buttontextStyle: {
    fontSize: 24,
    textAlign: "center",
  },
  touchbutton: {
    borderRadius: 5,
    backgroundColor: "darkseagreen",
    padding: 5,
    width: "25%",
  },
  mainview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalView: {
    margin: 10,
    backgroundColor: "gainsboro",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    height: "50%",
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
    backgroundColor: "purple",
  },
});

export default MedicineModal;
