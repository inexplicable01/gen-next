import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Header from "../components/templates/Header";
import { FlatList } from "react-native-gesture-handler";
// import * from

const divideIntoSeven = (days) => {
  const mday = new Date(Date.now() - (days/2)*24*60*60*1000)

  console.log(mday)
  const daysarr = [];
  const firstweek = new Array(7);
  for (let i = 0; i < 7; i++){
    // console.log(m90day.getTime() - (m90day.getDay()-1-i)*24*60*60*1000)
    firstweek[i] = new Date(mday.getTime() - (mday.getDay()-1-i)*24*60*60*1000)
  }
  daysarr.push(firstweek)
  // console.log('f',firstweek)
  const roundeddays = days - days %7
  const daystonewweek = 7 - mday.getDay()+1

  // console.log('roundeddays',roundeddays)
  for (let iweeks = 0; iweeks < roundeddays/7; iweeks++) {
    const weekarr = [];
    for (let idays = 0; idays < 7; idays++) {
      // weekarr[seven] = days.shift();
      weekarr[idays]= new Date(mday.getTime() + (idays+daystonewweek+ iweeks*7)*24*60*60*1000)
    }
    daysarr.push(weekarr);
  }
  return daysarr;
};


const CalendarScreen = (props) => {
  const [listlength, setListlength] = useState(100);
  const [isLoading, setIsLoading] = useState(false)
  const calendar = useSelector((state) => state.calendar);
  const days = divideIntoSeven(180);
  const rand = Math.floor(Math.random() * 6 + 1);
  const flatlistRef = useRef(null);
  const populateCalendar = () => {
    console.log("hehe");
    setListlength((l) => l + 100);
  };

  useEffect(() => {
    // flatlistRef.current.scrollToOffset({ offset: 300, animated: true });
    // flatlistRef.current.scrollToIndex({ index: 2, animated: true });        
  }, []);

  const getItemLayout = (data, index) => (
    { length: 50, offset: 300, index }
  )

  // console.log(days);
  return (
    <View style={styles.mainview}>
      <Header extrastyles={{ flex: 1 }} />
      <Text>Current Date: {calendar.currentdate}</Text>
      <View style={styles.calendarcomp}>
        <View style={{ flex: 6 }}>
          <FlatList
            data={days}
            style={{ borderWidth: 2, padding: 25 }}
            onEndReachedThreshold={0.5}
            ref={flatlistRef}
            refreshing={true}
            // getItemLayout={getItemLayout}

            initialScrollIndex={6}
            keyExtractor={(item) => ''+item[0].getTime()}
            onEndReached={populateCalendar}
            onScroll={(scrollinfo)=>{console.log(scrollinfo.nativeEvent.contentOffset.y)}}
            onScrollToIndexFailed={() => {
              }}
            renderItem={(week, index, sep) => {
              return <CalLine daysnumbers={week.item} />;
            }}
          />

        </View>

        <View style={{ borderWidth: 2, flex: 3 }}>
          <Text>Fup</Text>
        </View>
      </View>
    </View>
  );
};

const MonthBlock = ()=>{
  
}

const CalLine = (props) => {
  var day = [];
  // console.log(props.daysnumbers)
  // const numofcheckbox = props.downselecteddata.length;
  // console.log(props.daysnumbers)
  const today = new Date();
  // const istoday = 
  for (let i = 0; i < props.daysnumbers.length; i++) {
    day.push(
      <View key={i} style={styles.days}>
        <Text>{props.daysnumbers[i].getMonth()+1} {props.daysnumbers[i].getDate()}</Text>
        {(props.daysnumbers[i].getDate()==today.getDate())?<Text>Tada</Text>:
          <Text>C</Text>
        }
        
      </View>
    );
  }

  return <View style={styles.callinestyle}>{day}</View>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  callinestyle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "teal",
  },
  days: {
    flex: 1,
    padding: 4,
    borderWidth: 2,
  },
  mainview: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
  },
  calendarcomp: {
    width: "100%",
    borderWidth: 2,
    backgroundColor: "yellow",
    flex: 17,
    padding: 10,
    // height:500,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CalendarScreen;
