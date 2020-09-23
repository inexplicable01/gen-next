import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { notescaldefinition } from "../../definitions/Notices";
import Icon from "react-native-vector-icons/FontAwesome5";
import { iconsFromNotes } from "../../definitions/Notices";
import ExpoIcon from '../../components/UI/ExpoIcon'

import { MonthName,fullmonth } from "../../definitions/HMCalendarUtils";
// import { useDispatch } from "react-redux";

const isThisMonth = (monthkey, compyear, compmonth)=> {
  if (monthkey){
    const [mon, year]=monthkey.split('_')
    if (compmonth===mon && compyear==year){
      return true
    }
  }
  return false
}

const layoutofdays = ( daysize,event)=>{
 console.log('layout', event.nativeEvent.layout)
 daysize.current.width=event.nativeEvent.layout.width
 console.log('setDaysize', daysize)
 
}
const today = new Date();
const MonthComp = (props) => {
  const {monthkey} = useSelector((state) => state.calendar);
  // console.log(monthkey)

  const thismonth = isThisMonth(monthkey,props.year,props.monthname)
  // console.log(mon, props.monthname)
  // console.log(mon===props.monthname)
  const monthtrans50 = {transform: [...styles.sidewaytext.transform, {translateX:50}]}
  const monthtrans = {transform: [...styles.sidewaytext.transform, {translateX:0}]}
  return (
    <View style={styles.monthview}>
      {/* colors={["white", "#3b5998", "white"]} */}
      <View style={thismonth? {...styles.sidewayview}:styles.sidewayview}>
        <Text numberOfLines={1}
        style={thismonth? {...styles.sidewaytext,...monthtrans50 , fontSize:15}:{...styles.sidewaytext, ...monthtrans}}>
          {fullmonth[props.monthname]} {props.year}
        </Text>
      </View>

      <View onLayout={layoutofdays.bind(this, props.daysize)}  style={styles.weekdatesview}>
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
  const {selected, calendarnotes, monthkey} = useSelector((state) => state.calendar);
  const today = new Date()

  const dayViewStyles= (dateString,thismonth)=> {
    let daystyle = {...styles.days}
    // console.log(dateString)
    // if (thismonth){
    //   daystyle ={...daystyle, backgroundColor: 'lightgrey'}
    // }
    if (selected===dateString) {
      // console.log(dateString)
      // console.log(i,props.daysnumbers[i].dateString)
      daystyle = {...daystyle,borderRadius:10,backgroundColor: 'pink'}
    };
    return daystyle
  }
  
  
  const dayTextStyles= (dateString,thismonth)=> {
    let daytext = {...styles.text}

    
    if (thismonth){
      daytext ={...daytext, color: 'black',fontSize: 14}
    }
    if (today.toISOString().split("T")[0]===dateString) {
      daytext = {...daytext, color: 'pink', fontSize:16}
    };
    if (selected===dateString) {
      daytext = {...daytext,fontSize: 20, color:'red'}
    };


    return daytext
  }

  for (let i = 0; i < props.daysnumbers.length; i++) {
    const [yearstr, monthnum, daystr] =props.daysnumbers[i].dateString.split('-')
    // console.log(yearstr,MonthName[parseInt(monthnum)-1])
    const thismonth = isThisMonth(monthkey,yearstr,MonthName[parseInt(monthnum)-1])
    day.push(
      <TouchableOpacity
        style={dayViewStyles(props.daysnumbers[i].dateString,thismonth)}
        key={i}
        onPress={props.onDayPressed.bind(this, props.daysnumbers[i])}
      >
        <View style={{flex:5,justifyContent:'center',alignItems:'center'}}>
          <Text
            style={dayTextStyles(props.daysnumbers[i].dateString,thismonth)}
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
const TEXT_WIDTH = 40;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: 'grey'
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
    backgroundColor: "#F7E5F2"
    // backgroundColor: "tomato",
  },
  sidewayview: {
    borderWidth: 2,
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
