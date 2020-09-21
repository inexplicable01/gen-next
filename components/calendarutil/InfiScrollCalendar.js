import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MonthComp from "../calendarutil/MonthComp";
import {
  MonthName,
  dateToCustomObject,
  monthdaysinyear
} from "../../definitions/HMCalendarUtils";
import Month from "../../models/month";
import * as calendarActions from "../../store/actions/calendar";
import { useDispatch } from "react-redux";

if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
}

const InfiScrollCalendar = (props) => {
  //   useEffect(() => {
  //     flatlistRef.current.scrollToOffset({ offset: 300, animated: true });
  //     // flatlistRef.current.scrollToIndex({ index: 2, animated: true });
  //   }, []);
  const [refreshing, setRefreshing] = useState(false)
  const [calendardates, setCalendarDates] = useState(createCalendar(3)); //3months forward and 3 months back
  const flatlistRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(calendarActions.initiatecalendar())
  },[])


  const addPriorMonths = (nummonths) => {
    // console.log(nummonths)
    setRefreshing(true)
    setCalendarDates((cdates) => {
      // console.log(cdates[0].wkarr[0][0])
      const monthstoadd = priorMonths(nummonths,cdates[0].wkarr[0][0])
      // return [...cdates, newMonth];
      // console.log(monthstoadd)
      return [...monthstoadd,...cdates];
    });

    setRefreshing(false)
  }

  const populateCalendar = () => {
    setRefreshing(true);
    setCalendarDates((cdates) => {
      const addmonths = 3
      const lastcurday = cdates.last().wkarr.last()[6]
      // console.log(lastcurday.dateString)
      // console.log('timestap', lastcurday.timestamp)
      let curday = new Date(lastcurday.timestamp + 24 * 60 * 60 * 1000)
      // console.log('curday', curday)
      const monthsdayarr  = monthdaysinyear(curday.getFullYear())

      const laterday = new Date(curday.getTime() + addmonths * 30 * 24 * 60 * 60 * 1000);
      const lateday = new Date(laterday.getFullYear(), laterday.getMonth(), monthsdayarr[laterday.getMonth()], 12, 0, 0);
      const lastday = dateToCustomObject(
        new Date(lateday.getTime() + (6 - lateday.getDay()) * 24 * 60 * 60 * 1000)
      );

      let curMonth = curday.getMonth()
      let curYear = curday.getFullYear()
      let newmonth = true;
      // console.log(curday.toDateString())
      // console.log(lateday.toDateString())
      let cmonth;
      const monthstoadd = []
      while (curday.getTime() < lastday.timestamp) {
        if (newmonth) {
          cmonth = new Month(curMonth, curYear, []);
          monthstoadd.push(cmonth);
          newmonth = false;
        }
        const weekarr = [];
    
        for (let idays = 0; idays < 7; idays++) {
          weekarr[idays] = dateToCustomObject(new Date(curday.getTime()));
          curday = new Date(curday.getTime() + 24 * 60 * 60 * 1000);
        }
    
        cmonth.addweek(weekarr);
        const newMonday = dateToCustomObject(
          new Date(weekarr[6].timestamp + 24 * 60 * 60 * 1000)
        );
        
        if (newMonday.month !== cmonth.monthno) {
          newmonth = true;
          curMonth = newMonday.month;
          curYear = newMonday.year;
          // cmonth = new Month(MonthName[newMonday.month], newMonday.month, newMonday.year, [] )
        }
      }
      // return [...cdates, newMonth];
      return [...cdates,...monthstoadd];
    });

    setTimeout(function () {
      setRefreshing(false);
    }, 1);
    
  };

  return (
    <FlatList
      data={calendardates}
      onEndReachedThreshold={0.5}
      ref={flatlistRef}
      refreshing={true}
      initialScrollIndex={3}
      keyExtractor={(item) => {
        // console.log(item.monthno);
        return item.monthyear();
      }}
      refreshing={refreshing}
      onRefresh={addPriorMonths.bind(this, 3)}
      onEndReachedThreshold={0.9}
      onEndReached={populateCalendar}
      // onScroll={scrollControll}
      onScrollToIndexFailed={() => {}}
      renderItem={(month, index, sep) => {
        // console.log(month.item.wkarr)
        return (
          <View>
            {/* <Text>{month.item.monthyear()}</Text> */}
            <MonthComp
              onDayPressed={props.onDayPressed}
              monthname={month.item.monthname()}
              year={month.item.year}
              weekarr={month.item.wkarr}
            />
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  mainview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


const priorMonths = (nummonths, firstdaycustomobj) => {

  // console.log('firstdaycustomobj',firstdaycustomobj)
  // console.log('timestap', firstdaycustomobj.timestamp)

  const earlymonth = new Date(firstdaycustomobj.timestamp - nummonths * 30 * 24 * 60 * 60 * 1000)
  const earlyday = new Date(earlymonth.getFullYear(), earlymonth.getMonth(), 1, 12, 0, 0);

  let firstmondaytime;
  if (earlyday.getDay()==0){
    firstmondaytime = earlyday.getTime();
  } else {
    firstmondaytime = earlyday.getTime() + (7-earlyday.getDay()) * 24 * 60 * 60 * 1000;
  }

  // const firstday = dateToCustomObject(new Date(firstmondaytime));
  let curday = new Date(firstmondaytime)
  const lastday = new Date(firstdaycustomobj.timestamp - 24 * 60 * 60 * 1000)

  let curMonth = curday.getMonth()
  let curYear = curday.getFullYear()
  let newmonth = true;
  // console.log(curday.toDateString())
  // console.log(lateday.toDateString())
  let cmonth;
  const monthstoadd = []

  // console.log('a',curday.getTime() )
  // console.log('b',lastday.getTime())
  while (curday.getTime() < lastday.getTime()) {
    if (newmonth) {
      cmonth = new Month(curMonth, curYear, []);
      monthstoadd.push(cmonth);
      newmonth = false;
    }
    const weekarr = [];

    for (let idays = 0; idays < 7; idays++) {
      weekarr[idays] = dateToCustomObject(new Date(curday.getTime()));
      curday = new Date(curday.getTime() + 24 * 60 * 60 * 1000);
    }

    cmonth.addweek(weekarr);
    const newMonday = dateToCustomObject(
      new Date(weekarr[6].timestamp + 24 * 60 * 60 * 1000)
    );
    
    if (newMonday.month !== cmonth.monthno) {
      newmonth = true;
      curMonth = newMonday.month;
      curYear = newMonday.year;
      // cmonth = new Month(MonthName[newMonday.month], newMonday.month, newMonday.year, [] )
    }
  }
  // console.log('monthstoadd',monthstoadd)
  return monthstoadd
}

const createCalendar = (months) => {
  const mday = new Date(Date.now() - months * 30 * 24 * 60 * 60 * 1000);
  const pday = new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000);
  const days = 90;

  const monthsdayarr  = monthdaysinyear(pday.getFullYear())
  const earlyday = new Date(mday.getFullYear(), mday.getMonth(), 1, 12, 0, 0);
  const lateday = new Date(pday.getFullYear(), pday.getMonth(), monthsdayarr[pday.getMonth()], 12, 0, 0);
  const calendardates = [];

  let firstmondaytime;
  if (earlyday.getDay()==0){
    firstmondaytime = earlyday.getTime();
  } else {
    firstmondaytime = earlyday.getTime() + (7-earlyday.getDay()) * 24 * 60 * 60 * 1000;
  }

  const firstday = dateToCustomObject(new Date(firstmondaytime));

  const lastday = dateToCustomObject(
    new Date(lateday.getTime() + (6 - lateday.getDay()) * 24 * 60 * 60 * 1000)
  );

  // console.log('day', lateday.getDay())
  // console.log(lateday.toDateString())

  let curday = new Date(firstday.timestamp);
  let curMonth = earlyday.getMonth()
  let curYear = earlyday.getFullYear()
  let newmonth = true;
  console.log(curday.toDateString())
  console.log(lateday.toDateString())
  let cmonth;
  while (curday.getTime() < lastday.timestamp) {
    if (newmonth) {
      cmonth = new Month(curMonth, curYear, []);
      calendardates.push(cmonth);
      newmonth = false;
    }
    const weekarr = [];

    for (let idays = 0; idays < 7; idays++) {
      weekarr[idays] = dateToCustomObject(new Date(curday.getTime()));
      curday = new Date(curday.getTime() + 24 * 60 * 60 * 1000);
    }

    cmonth.addweek(weekarr);
    const newMonday = dateToCustomObject(
      new Date(weekarr[6].timestamp + 24 * 60 * 60 * 1000)
    );
    
    if (newMonday.month !== cmonth.monthno) {
      newmonth = true;
      curMonth = newMonday.month;
      curYear = newMonday.year;
      // cmonth = new Month(MonthName[newMonday.month], newMonday.month, newMonday.year, [] )
    }
  }

  //   console.log("newMonday");
  return calendardates;
};

export default InfiScrollCalendar;
