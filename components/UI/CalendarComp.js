import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import { Calendar} from "react-native-calendars";
import {useDispatch} from "react-redux";
import * as calendarActions from '../../store/actions/calendar';
import { useSelector } from "react-redux";
import {notescaldefinition} from '../../definitions/Notices'


const convertNotesToMarkedDates = (notes, selected) => {
  let markeddates = {};
  Object.entries(notes).map(([key, notesarr]) => {
    const dotarray = [];
    for (const key in notescaldefinition) {
      // loop through each type of notice
      for (const act of notescaldefinition[key].liststr) {
        // loop through each word in the liststr, if word in liststr is in noteass, add the note definition and break from loop
        if (notesarr.includes(act)) {
          dotarray.push(notescaldefinition[key].dotdef); //push the dotdefinition into the dots array
          break; // break out of the liststr loop and move on to next notice
        }
      }
    }
    markeddates[key] = { dots: dotarray };
  });

    if (selected in markeddates) {
      markeddates[selected] = {...markeddates[selected], selected: true }
    } else {
      markeddates[selected] = {selected: true }
    }
    

  return markeddates;
};

// const olddate = state.selected;
// const olddatedetails = { ...state.markeddates[olddate] };
// if ("selected" in olddatedetails) {
//   delete olddatedetails["selected"];
// }

// const newdate = action.date;
// let newdatedetails;
// if (newdate in state.markeddates) {
//   newdatedetails = { ...state.markeddates[newdate], selected: true };
// } else {
//   newdatedetails = {
//     selected: true,
//   };
// }



const todaydate = new Date();

const CalendarComp = props =>{

    const dispatch = useDispatch();
    const calendar = useSelector((state) => state.calendar);
    // console.log('s',calendar.currentdate,'s')
    // console.log('2012-05-10')
    const caltheme = {
        // backgroundColor: "green",
        // calendarBackground: "maroon",
        // textSectionTitleColor: "#b6c1cd",
        // textSectionTitleDisabledColor: "#d9e1e8",
        selectedDayBackgroundColor: "aqua",
        selectedDayTextColor: "white",
        todayTextColor: "tomato",
        // dayTextColor: "#2d4150",
        // textDisabledColor: "#d9e1e8",
        // dotColor: "#00adf5",
        // selectedDotColor: "#ffffff",
        // arrowColor: "tomato",
        // disabledArrowColor: "#d9e1e8",
        // monthTextColor: "blue",
        // indicatorColor: "blue",
        // textDayFontFamily: "monospace",
        // textMonthFontFamily: "monospace",
        // textDayHeaderFontFamily: "monospace",
        textDayFontWeight: "300",
        textMonthFontWeight: "bold",
        textDayHeaderFontWeight: "300",
        textDayFontSize: 14,
        textMonthFontSize: 20,
        textDayHeaderFontSize: 14,
      }
      // console.log('rerender')
    return <Calendar
    // Initially visible month. Default = Date()
    current={todaydate.toISOString().split('T')[0]}

    calendarWidth={500}
    markingType={'multi-dot'}
    markedDates={convertNotesToMarkedDates(calendar.calendarnotes, calendar.selected)}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    //   minDate={'2012-05-10'}
    //   // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
    //   maxDate={'2012-05-30'}
    // Handler which gets executed on day press. Default = undefined
    onDayPress={(day) => {
      // console.log("selected day", day);
      dispatch(calendarActions.setdate(day));
    }}
    // Handler which gets executed on day long press. Default = undefined
    onDayLongPress={(day) => {
      console.log("selected day Long Press", day);
      // dispatch(calendarActions.dotdate(day));
    }}
    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
    //   monthFormat={'yyyy MM'}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {console.log('month changed', month)}}
      // Hide month navigation arrows. Default = false
    //   hideArrows={true}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
    //   renderArrow={(direction) => (<Arrow/>)}
      // Do not show days of other months in month page. Default = false
    //   hideExtraDays={true}
      // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
    //   disableMonthChange={true}
    //   // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
    //   firstDay={1}
    //   // Hide day names. Default = false
    //   hideDayNames={true}
    //   // Show week numbers to the left. Default = false
    // //   showWeekNumbers={true}
    //   // Handler which gets executed when press arrow icon left. It receive a callback can go back month
    //   onPressArrowLeft={subtractMonth => subtractMonth()}
    //   // Handler which gets executed when press arrow icon right. It receive a callback can go next month
    //   onPressArrowRight={addMonth => addMonth()}
    //   // Disable left arrow. Default = false
    //   disableArrowLeft={true}
    //   // Disable right arrow. Default = false
    //   disableArrowRight={true}
    //   // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
    //   disableAllTouchEventsForDisabledDays={true}
    //   /** Replace default month and year title with custom one. the function receive a date as parameter. */
    //   renderHeader={(date) => {/*Return JSX*/}}
    style={{
        // flex:5,
      borderColor: "tomato",
      height: '100%',
      width: 360,
      borderRadius:30,
      // marginBottom:15
    }}
    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme={{...caltheme, 
    'stylesheet.day.basic':{
      text:{
        
      }
    }}}
  />
}




const styles = StyleSheet.create( {
    text: {
        fontSize: 16
    },
    mainview: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    }
})




export default CalendarComp;        