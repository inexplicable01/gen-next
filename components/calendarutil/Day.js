import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { notescaldefinition } from "../../definitions/Notices";
import Icon from "react-native-vector-icons/FontAwesome5";
import { iconsFromNotes } from "../../definitions/Notices";
import ExpoIcon from "../../components/UI/ExpoIcon";
import { MonthName, fullmonth } from "../../definitions/HMCalendarUtils";
const Day = (props) => {

    const today = new Date();

    const dayViewStyles = (datecustom) => {

        let daystyle = { ...styles.days };
        if (props.todaytf) {
          daystyle = { ...daystyle, borderRadius: 10, backgroundColor: "pink" };
        }
        return daystyle;
      };
    
      const dayTextStyles = (datecustom, thismonth) => {
        let daytext = { ...styles.text };
    
        if (thismonth) {
          daytext = { ...daytext, color: "black", fontSize: 14 };
        }
        if (
          today.getDate() === datecustom.day &&
          today.getMonth() === datecustom.month &&
          today.getFullYear() === datecustom.year
        ) {
          // console.log(datecustom.day, ' m' ,datecustom.month,' y' ,datecustom.year)
          daytext = { ...daytext, color: "pink", fontSize: 16, fontWeight: "bold" };
        }
        if (props.todaytf) {
          daytext = { ...daytext, fontSize: 20, color: "black" };
        }
    
        return daytext;
      };


  return (
    <TouchableOpacity
      style={dayViewStyles(props.daynumber)}
      onPress={props.onDayPressed.bind(this,props.daynumber )}
      // onPress={()=>console.log('pressed')}
    >
      <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
        <Text style={dayTextStyles(props.daynumber, props.thismonth) }>
          {props.daynumber.day}
        </Text>
      </View>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <IQIcons notes={props.notes} />
        {/* notes={props.refCalendardates[props.monthyear][props.weeki][props.daysnumbers[i].dateString]} */}
      </View>
    </TouchableOpacity>
  );
};


const IQIcons = React.memo((props) => {


    if (props.notes) {
      // console.log(props.notes);
      const iconsToChart = iconsFromNotes(props.notes);
      // const blah= [{iconname:'heart', iconcolor:'red'}]
      // iconsFromNotes(props.notes);{iconname:'heart', iconcolor:'red'}
      const icon = [];
      for (let iicon = 0; iicon < iconsToChart.length; iicon++) {
        icon.push(
          <ExpoIcon
            key={iicon}
            name={iconsToChart[iicon].iconname}
            color={iconsToChart[iicon].iconcolor}
            iconfamily={iconsToChart[iicon].iconfamily}
            size={10}
          />
        );
      }
      return <View style={{ flexDirection: "row" }}>{icon}</View>;
    } else {
      return <View style={{ flexDirection: "row", flex: 1 }}></View>;
    }
  });

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

export default React.memo(Day)