import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { MonthName, fullmonth } from "../../definitions/HMCalendarUtils";
import Day from "../../components/calendarutil/Day";
const isThisMonth = (monthkey, compyear, compmonth) => {
  if (monthkey) {
    const [mon, year] = monthkey.split("_");
    if (compmonth === mon && compyear == year) {
      return true;
    }
  }
  return false;
};

const CalLine = (props) => {
  const todayobj = useSelector(state=>state.calendar.todayobj)
  var day = [];
  const oddweek = Math.abs(Math.round((todayobj.getTime() - props.daysnumbers[0].timestamp)/1000/60/60/24/7)%2)
  for (let i = 0; i < props.daysnumbers.length; i++) {
    const [yearstr, monthnum, daystr] = props.daysnumbers[i].dateString.split(
      "-"
    );
    const thismonth = isThisMonth(
      props.monthkey,
      yearstr,
      MonthName[parseInt(monthnum) - 1]
    );
    day.push(
      <Day
        key={i}
        todaytf = {props.selectedArrayweek[props.daysnumbers[i].dateString]}
        daynumber={props.daysnumbers[i]}
        thismonth={thismonth}
        onDayPressed={props.onDayPressed}
        notes={props.notesweek[props.daysnumbers[i].dateString]}
      />
    );
  }

  return (
    <View
      style={
        oddweek
          ? { ...styles.callinestyle }
          : { ...styles.callinestyle, backgroundColor: "white" }
      }
    >
      {day}
    </View>
  );
};



const TEXT_HEIGHT = 40;
const TEXT_WIDTH = 40;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: "grey",
  },
  monthview: {
    // flex:1,
    // padding: 20,
    borderColor: "teal",
    // borderWidth: 2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7E5F2",
    // backgroundColor: "tomato",
  },
  sidewayview: {
    // borderWidth: 2,
    flex: 1,
    // padding: 20,
    backgroundColor: "#F7E5F2",
    justifyContent: "center",
  },
  weekdatesview: {
    flex: 9,
    width: 200,
  },
  sidewaytext: {
    fontSize: 12,
    width: 120,
    // backgroundColor: "red",
    textAlign: "center",
    transform: [
      { rotate: "270deg" },
      //   { translateX: 20 },
      { translateY: -TEXT_HEIGHT },
    ],
    // { translateY: OFFSET },
  },

  callinestyle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "#F7E5F2",
  },
  days: {
    flex: 1,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    // borderWidth: 2,
  },
});

export default React.memo(CalLine);
