import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { notescaldefinition } from "../../definitions/Notices";
import Icon from "react-native-vector-icons/FontAwesome5";
import { iconsFromNotes } from "../../definitions/Notices";
import ExpoIcon from '../../components/UI/ExpoIcon'

// import { MonthName, dateToCustomObject } from "/HMCalendarUtils";
// import { useDispatch } from "react-redux";

const today = new Date();
const MonthComp = (props) => {
  //   console.log(props.weekarr[0][0]);

  return (
    <View style={styles.monthview}>
      {/* colors={["white", "#3b5998", "white"]} */}
      <View style={styles.sidewayview}>
        <Text style={styles.sidewaytext}>
          {props.monthname} {props.year}
        </Text>
      </View>

      <View style={styles.weekdatesview}>
        <Weeks onDayPressed={props.onDayPressed} weekarr={props.weekarr} />
      </View>
    </View>
  );
};

const Weeks = (props) => {
  var weeks = [];
  for (let iweek = 0; iweek < props.weekarr.length; iweek++) {
    weeks.push(
      <CalLine
        key={"iweek" + iweek}
        onDayPressed={props.onDayPressed}
        daysnumbers={props.weekarr[iweek]}
      />
    );
  }
  return <View style={styles.weeks}>{weeks}</View>;
};

const CalLine = (props) => {
  // console.log('wtf')
  var day = [];
  const {selected, calendarnotes} = useSelector((state) => state.calendar);
  const today = new Date()

  const dayViewStyles= (dateString)=> {
    let daystyle = {...styles.days}
    // console.log(dateString)
    if (selected===dateString) {
      // console.log(dateString)
      // console.log(i,props.daysnumbers[i].dateString)
      daystyle = {...daystyle,borderRadius:10,backgroundColor: 'pink'}
    };
    return daystyle
  }
  
  
  const dayTextStyles= (dateString)=> {
    let daytext = {...styles.text}
    // console.log(dateString)
    if (today.toISOString().split("T")[0]===dateString) {
      console.log('h', dateString)
      // console.log(i,props.daysnumbers[i].dateString)
      daytext = {...daytext, color: 'pink', fontSize:16}
    };
    if (selected===dateString) {
      console.log(dateString)
      // console.log(i,props.daysnumbers[i].dateString)
      daytext = {...daytext,fontSize: 20, color:'red'}
    };
    return daytext
  }

  for (let i = 0; i < props.daysnumbers.length; i++) {
    day.push(
      <TouchableOpacity
        style={dayViewStyles(props.daysnumbers[i].dateString)}
        key={i}
        onPress={props.onDayPressed.bind(this, props.daysnumbers[i])}
      >
        <View style={{flex:5,justifyContent:'center',alignItems:'center'}}>
          <Text
            style={dayTextStyles(props.daysnumbers[i].dateString)}
          >{props.daysnumbers[i].day}</Text>
        </View>
        <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>

        {calendarnotes[props.daysnumbers[i].dateString] ? (
          <IQIcons notes={calendarnotes[props.daysnumbers[i].dateString]} />
        ) : null
        }
        </View>
      </TouchableOpacity>
    );
  }

  return <View style={styles.callinestyle}>{day}</View>;
};

const IQIcons = (props) => {
  const iconsToChart = iconsFromNotes(props.notes)
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
};

const TEXT_HEIGHT = 40;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
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
    backgroundColor: "tomato",
  },
  sidewayview: {
    // borderWidth: 2,
    flex: 1,
    // padding: 20,
    backgroundColor: "orange",
    width: TEXT_HEIGHT,
    // height: "35%",
    justifyContent: "center",
  },
  weekdatesview: {
    flex: 9,
    width: 200,
  },
  sidewaytext: {
    fontSize: 24,
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
    backgroundColor: "white",
  },
  days: {
    flex: 1,
    padding: 4,
    alignItems:'center',
    justifyContent:'center',
    height:40
    // borderWidth: 2,
  },
});

export default MonthComp;
