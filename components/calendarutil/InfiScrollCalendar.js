import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MonthComp from "../calendarutil/MonthComp";
import {
  MonthName,
  dateToCustomObject,
  monthdaysinyear,
  weekdaynames,
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
  const [refreshing, setRefreshing] = useState(false);
  const daysize = useRef({ height: 50, width: 350, x: 38, y: 0 });
  const [calendardates, setCalendarDates] = useState(createCalendar(3)); //3months forward and 3 months back
  const flatlistRef = useRef(null);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const dispatch = useDispatch();
  const initialindex = 3;

  useEffect(() => {
    dispatch(calendarActions.initiatecalendar());
    dispatch(
      calendarActions.currentcalendarmonth(
        calendardates[initialindex].monthyear()
      )
    );
  }, []);

  const addPriorMonths = (nummonths) => {
    // console.log(nummonths)
    setRefreshing(true);
    setCalendarDates((cdates) => {
      const monthstoadd = priorMonths(nummonths, cdates[0].wkarr[0][0]);
      return [...monthstoadd, ...cdates];
    });

    setRefreshing(false);
  };

  const populateCalendar = () => {
    setRefreshing(true);
    setCalendarDates((cdates) => {
      
      const addmonths = 3;
      const lastcurday = cdates.last().wkarr.last()[6];
      let curday = new Date(lastcurday.timestamp + 24 * 60 * 60 * 1000);
      const monthsdayarr = monthdaysinyear(curday.getFullYear());
      const laterday = new Date(
        curday.getTime() + addmonths * 30 * 24 * 60 * 60 * 1000
      );
      const lateday = new Date(
        laterday.getFullYear(),
        laterday.getMonth(),
        monthsdayarr[laterday.getMonth()],
        12,
        0,
        0
      );
      const lastday = dateToCustomObject(
        new Date(
          lateday.getTime() + (6 - lateday.getDay()) * 24 * 60 * 60 * 1000
        )
      );

      let curMonth = curday.getMonth();
      let curYear = curday.getFullYear();
      let newmonth = true;
      // console.log(curday.toDateString())
      // console.log(lateday.toDateString())
      let cmonth;
      const monthstoadd = [];
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
        }
      }
      return [...cdates, ...monthstoadd];
    });

    setTimeout(function () {
      setRefreshing(false);
    }, 1);
  };

  const _scrollControll = useCallback(({ viewableItems, changed }) => {
    dispatch(calendarActions.currentcalendarmonth(viewableItems[0].key));
  }, []);

  return (
    <View
      style={{ ...props.calendarstyle, backgroundColor: "#FF89DE" }}
      pointerEvents={calendarLoading ? "none" : "auto"}
    >
      <View style={{ backgroundColor: "#FF89DE", width: "100%", flex: 1 , paddingBottom:20}}>
        {/* style={{ backgroundColor: "#FF89DE", width: "100%",  flex:1}} */}
        {CalHeaders(daysize)}
      </View>
      <View style={styles.calendarst}>
        <FlatList
          data={calendardates}
          onEndReachedThreshold={0.5}
          ref={flatlistRef}
          refreshing={true}
          initialScrollIndex={initialindex}
          keyExtractor={(item) => {
            return item.monthyear();
          }}
          refreshing={refreshing}
          onRefresh={addPriorMonths.bind(this, 3)}
          // onViewableItemsChanged={_scrollControll}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 85,
          }}
          onEndReachedThreshold={0.9}
          onEndReached={populateCalendar}
          onScrollToIndexFailed={() => {}}
          renderItem={(month, index, sep) => {
            // console.log(month.item.wkarr)
            return (
                <MonthComp
                  onDayPressed={props.onDayPressed}
                  monthname={month.item.monthname()}
                  year={month.item.year}
                  weekarr={month.item.wkarr}
                  daysize={daysize}
                />
            );
          }}
        />
      </View>
    </View>
  );
};

const CalHeaders = (daysize) => {
  const day = [];
  for (let i = 0; i < weekdaynames.length; i++) {
    day.push(
      <View
        key={"" + i}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>{weekdaynames[i]}</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        height: daysize.current.height,
        width: daysize.current.width,
        marginLeft: daysize.current.x,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {day}
    </View>
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
  calendarst: {
    flex: 10,
  },
});

const priorMonths = (nummonths, firstdaycustomobj) => {
  const earlymonth = new Date(
    firstdaycustomobj.timestamp - nummonths * 30 * 24 * 60 * 60 * 1000
  );
  const earlyday = new Date(
    earlymonth.getFullYear(),
    earlymonth.getMonth(),
    1,
    12,
    0,
    0
  );

  let firstmondaytime;
  if (earlyday.getDay() == 0) {
    firstmondaytime = earlyday.getTime();
  } else {
    firstmondaytime =
      earlyday.getTime() + (7 - earlyday.getDay()) * 24 * 60 * 60 * 1000;
  }

  let curday = new Date(firstmondaytime);
  const lastday = new Date(firstdaycustomobj.timestamp - 24 * 60 * 60 * 1000);

  let curMonth = curday.getMonth();
  let curYear = curday.getFullYear();
  let newmonth = true;
  let cmonth;
  const monthstoadd = [];

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
    }
  }
  return monthstoadd;
};

const createCalendar = (months) => {
  const mday = new Date(Date.now() - months * 30 * 24 * 60 * 60 * 1000);
  const pday = new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000);
  const days = 90;

  const monthsdayarr = monthdaysinyear(pday.getFullYear());
  const earlyday = new Date(mday.getFullYear(), mday.getMonth(), 1, 12, 0, 0);
  const lateday = new Date(
    pday.getFullYear(),
    pday.getMonth(),
    monthsdayarr[pday.getMonth()],
    12,
    0,
    0
  );
  const calendardates = [];

  let firstmondaytime;
  if (earlyday.getDay() == 0) {
    firstmondaytime = earlyday.getTime();
  } else {
    firstmondaytime =
      earlyday.getTime() + (7 - earlyday.getDay()) * 24 * 60 * 60 * 1000;
  }

  const firstday = dateToCustomObject(new Date(firstmondaytime));

  const lastday = dateToCustomObject(
    new Date(lateday.getTime() + (6 - lateday.getDay()) * 24 * 60 * 60 * 1000)
  );

  // console.log('day', lateday.getDay())
  // console.log(lateday.toDateString())

  let curday = new Date(firstday.timestamp);
  let curMonth = earlyday.getMonth();
  let curYear = earlyday.getFullYear();
  let newmonth = true;
  // console.log(curday.toDateString())
  // console.log(lateday.toDateString())
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

  return calendardates;
};

export default InfiScrollCalendar;
