import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { notescaldefinition } from "../../definitions/Notices";
import Icon from "react-native-vector-icons/FontAwesome5";
import { iconsFromNotes } from "../../definitions/Notices";
import ExpoIcon from "../../components/UI/ExpoIcon";
import CalLine from "../../components/calendarutil/CalLine";

import { MonthName, fullmonth } from "../../definitions/HMCalendarUtils";
// import { useDispatch } from "react-redux";

const isThisMonth = (monthkey, compyear, compmonth) => {
  if (monthkey) {
    const [mon, year] = monthkey.split("_");
    if (compmonth === mon && compyear == year) {
      return true;
    }
  }
  return false;
};

const layoutofdays = (daysize, event) => {
  daysize.current.width = event.nativeEvent.layout.width;
};

const MonthComp = React.memo((props) => {
  // const height = useRef(0);
  // console.log('moth', props.monthname, 'rendered')
  const [heightstate, setHeightState] = useState(0);
  const thismonth = isThisMonth(props.monthkey, props.year, props.monthname);

  const monthnamelayout = (event) => {
    let midpoint = 0;
    const weekcellheight =
      event.nativeEvent.layout.height / props.weekarr.length;
    // console.log(fullmonth[props.monthname], props.year, props.weekarr.length)
    if (props.mixedfirstweek) {
      midpoint = midpoint + weekcellheight / 4;
    }
    if (props.mixedlastweek) {
      midpoint = midpoint + weekcellheight / 4;
    }
    setHeightState(Math.round(midpoint));
  };

  const monthtrans = (num) => {
    return {
      transform: [...styles.sidewaytext.transform, { translateX: num }],
    };
  };

  // console.log("notesmonth", props.monthyear);
  // console.log('refCalendardates',props.refCalendardates)
  return (
    <View onLayout={monthnamelayout} style={styles.monthview}>
      <View style={thismonth ? { ...styles.sidewayview } : styles.sidewayview}>
        <Text
          numberOfLines={1}
          style={
            thismonth
              ? {
                  ...styles.sidewaytext,
                  ...monthtrans(heightstate),
                  fontSize: 15,
                }
              : { ...styles.sidewaytext, ...monthtrans(heightstate) }
          }
        >
          {fullmonth[props.monthname]} {props.year}
        </Text>
      </View>

      <View
        onLayout={layoutofdays.bind(this, props.daysize)}
        style={styles.weekdatesview}
      >
        <View style={styles.weeks}>
          {props.weekarr.map((weekarr, iweek) => (
            <CalLine
              key={"week" + iweek}
              onDayPressed={props.onDayPressed}
              daysnumbers={weekarr}
              monthkey={props.monthkey}
              weeki={"week" + iweek}
              // selecteddate={props.selecteddate}
              monthyear={props.monthyear}
  
              // selectedArrayweek = {props.selectedArray["week" + iweek]?props.selectedArray["week" + iweek]:[false,false,false,false,false,false,false]}
              selectedArrayweek = {props.selectedArray?props.selectedArray["week" + iweek]
                :[false,false,false,false,false,false,false]}
       
              // refCalendardates = {props.refCalendardates}
              // notesweek={props.notesmonth["week" + iweek]}
              notesweek={props.notesmonth?props.notesmonth["week" + iweek]:[[],[],[],[],[],[],[]]}
            />
          ))}
        </View>
      </View>
    </View>
  );
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
    // width: TEXT_HEIGHT,
    // height: "100%",
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
  //   style={{
  //     transform: [
  //       { rotate: "90deg" },
  //       { translateX: -OFFSET },
  //       { translateY: OFFSET },
  //     ],
  //     width: TEXT_LENGTH,
  //     height: TEXT_HEIGHT,
  //   }}

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

export default MonthComp;
