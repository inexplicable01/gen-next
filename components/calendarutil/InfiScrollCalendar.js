import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MonthComp from "../calendarutil/MonthComp";
import {
  MonthName,
  dateToCustomObject,
  monthdaysinyear,
  weekdaynames,
  examwkair,
} from "../../definitions/HMCalendarUtils";
import Month from "../../models/month";
import * as calendarActions from "../../store/actions/calendar";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
}

const nummonths = 3;

const InfiScrollCalendar = (props) => {
  const { selected, calendarnotes, monthkey, todayobj } = useSelector(
    (state) => state.calendar
  );

  const [refreshing, setRefreshing] = useState(false);
  const daysize = useRef({ height: 50, width: 350, x: 38, y: 0 });
  const key = useRef();
  const selecteddate = useRef();
  const updown = useRef("down");
  const [calendardates, setCalendarDates] = useState(
    getcalendarmonths("Initiate")
  ); //3months forward and 3 months back
  const flatlistRef = useRef(null);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const dispatch = useDispatch();
  const refCalendardates = useRef({});
  const [trig1, setTrig1] = useState(false);
  const [trig2, setTrig2] = useState(false);
  // setTrig1

  // checkfornotesdiff(calendarnotes, refCalendardates, calendardates);
  const [notes, setNotes] = useState(
    initiatesnotes(calendarnotes, calendardates)
  );

  const [selectedArray, setSelectedArray] = useState(
    initiatesSelected(selected, calendardates)
  );

  useEffect(() => {
    dispatch(calendarActions.initiatecalendar());
    // const todaycustom = dateToCustomObject(todayobj)
    const todaymonth = MonthName[todayobj.getMonth()] + '_'+todayobj.getFullYear()
    dispatch(
      calendarActions.currentcalendarmonth(todaymonth)
    );
    key.current = todaymonth;
  }, []);

  const addPriorMonths = () => {
    // console.log(nummonths)
    setRefreshing(true);
    setCalendarDates((cdates) => {
      const monthstoadd = getcalendarmonths("AddPrevious", cdates);
      for (const monthele of monthstoadd) {
        console.log("infi render", monthele.monthyear());
        // for (const weeki of monthele.wkarr) {
        //   console.log(weeki[0].dateString);
        // }
      }
      return [...monthstoadd, ...cdates];
    });
    setRefreshing(false);
  };

  useEffect(() => {

    setRefreshing(true);
    // console.log("got to here", calendardates[0].monthyear());

    // for (const monthele of calendardates) {
    //   console.log("infi render", monthele.monthyear());
    //   // for (const weeki of monthele.wkarr) {
    //   //   console.log(weeki[0].dateString);
    //   // }
    // }
    setNotes(initiatesnotes(calendarnotes, calendardates));
    setSelectedArray(initiatesSelected(selected, calendardates));
    setRefreshing(false);
  }, [calendardates]);

  const populateCalendar = () => {
    setRefreshing(true);
    setCalendarDates((cdates) => {
      const monthstoadd = getcalendarmonths("AddMonths", cdates);

      return [ ...cdates,...monthstoadd];
    });
    setTimeout(function () {
      setRefreshing(false);
    }, 1);
  };

  const _scrollControll = useCallback(({ viewableItems, changed }) => {
    try {
      if (key.current != viewableItems[0].key) {
        dispatch(calendarActions.currentcalendarmonth(viewableItems[0].key));
        key.current = viewableItems[0].key;
      }
    } catch (err) {
      console.log("catch");
    }
  }, []);

  useEffect(() => {
    console.log("triggered by calendar");
    for (const [monthyear, weeks] of Object.entries(notes)) {
      for (const [weeki, day] of Object.entries(weeks)) {
        for (const [daystring, dayarray] of Object.entries(day)) {
          if (calendarnotes[daystring]) {
            if (!compareArray(dayarray, calendarnotes[daystring])) {
              setNotes((notes) => {
                notes[monthyear] = {
                  ...notes[monthyear],
                  [weeki]: {
                    ...notes[monthyear][weeki],
                    [daystring]: [...calendarnotes[daystring]],
                  },
                };

                return notes;
              });
              setTrig1((trig) => !trig);
            }
          } else {
            setNotes((notes) => {
              notes[monthyear][weeki][daystring] = [];
              return notes;
            });
          }
        }
      }
    }

    // setNotes(refCalendardates.current)
  }, [calendarnotes]);
  //

  useEffect(() => {
    console.log("triggered by selected", selected);
    for (const [monthyear, weeks] of Object.entries(selectedArray)) {
      for (const [weeki, days] of Object.entries(weeks)) {
        for (const [daystring, selectedbool] of Object.entries(days)) {
          if (selectedbool) {
            // console.log('here1')
            setSelectedArray((selectedArray) => {
              selectedArray[monthyear] = {
                ...selectedArray[monthyear],
                [weeki]: {
                  ...selectedArray[monthyear][weeki],
                  [daystring]: false,
                },
              };
              return selectedArray;
            });
          }
          if (daystring == selected) {
            // console.log('here2')
            setSelectedArray((selectedArray) => {
              selectedArray[monthyear] = {
                ...selectedArray[monthyear],
                [weeki]: {
                  ...selectedArray[monthyear][weeki],
                  [daystring]: true,
                },
              };
              return selectedArray;
            });
          }
        }
      }
    }
    setTrig2((trig) => !trig);
  }, [selected]);
  // for (const monthele of calendardates){
  //   console.log('infi render', monthele.monthyear())
  //   for (const weeki of monthele.wkarr){
  //     console.log(weeki[0].dateString)
  //   }

  // }
  return (
    <View
      style={{ ...props.calendarstyle, backgroundColor: "#FF89DE" }}
      pointerEvents={calendarLoading ? "none" : "auto"}
    >
      <View
        style={{
          backgroundColor: "#FF89DE",
          width: "100%",
          flex: 1,
          paddingBottom: 20,
        }}
      >
        {CalHeaders(daysize)}
      </View>
      <View style={styles.calendarst}>
        <FlatList
          data={calendardates}
          onEndReachedThreshold={0.5}
          ref={flatlistRef}
          // refreshing={true}
          initialScrollIndex={nummonths - 1}
          keyExtractor={(item) => {
            return item.monthyear();
          }}
          onEndReached={populateCalendar}
          onEndReachedThreshold={1.0}
          // onScroll={noteupordown}
          refreshing={refreshing}
          onRefresh={addPriorMonths.bind(this, nummonths)}
          onScrollToIndexFailed={() => {}}
          renderItem={(month, index, sep) => {
            // console.log(month.item.wkarr)
            //
            selecteddate.current = selected;
            return (
              <MonthComp
                onDayPressed={props.onDayPressed}
                monthname={month.item.monthname()}
                monthyear={month.item.monthyear()}
                year={month.item.year}
                weekarr={month.item.wkarr}
                // weekarr={examwkair}
                daysize={daysize}
                // selecteddate={selectedArray}
                mixedfirstweek={month.item.mixedfirstweek}
                mixedlastweek={month.item.mixedlastweek}
                monthkey={key.current}
                // refCalendardates={refCalendardates}
                notesmonth={notes[month.item.monthyear()]}
                selectedArray={selectedArray[month.item.monthyear()]}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const compareArray = (strarr1, strarr2) => {
  // assumes array is unique
  if (strarr1.length == strarr2.length) {
    for (const word of strarr1) {
      if (!strarr2.includes(word)) {
        // console.log('what')
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
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

const initiatesnotes = (calendarnotes, calendardates) => {
  let iweek;
  let notes = {};
  for (const month of calendardates) {
    notes[month.monthyear()] = {};
    iweek = 0;
    for (const wk of month.wkarr) {
      notes[month.monthyear()]["week" + iweek] = {};
      for (const day of wk) {
        // console.log('calendarnotes[day.dateString]',calendarnotes[day.dateString])
        if (calendarnotes[day.dateString]) {
          notes[month.monthyear()]["week" + iweek][day.dateString] = [
            ...calendarnotes[day.dateString],
          ];
        } else {
          notes[month.monthyear()]["week" + iweek][day.dateString] = [];
        }
      }
      iweek = iweek + 1;
      // refCalendardates.current[month.monthname()]['week'+ iweek] =
    }
  }

  return notes;
};

const initiatesSelected = (selected, calendardates) => {
  let iweek;
  let initiateSelectedArray = {};

  for (const month of calendardates) {
    initiateSelectedArray[month.monthyear()] = {};
    iweek = 0;
    for (const wk of month.wkarr) {
      initiateSelectedArray[month.monthyear()]["week" + iweek] = {};
      for (const day of wk) {
        // console.log('calendarnotes[day.dateString]',calendarnotes[day.dateString])
        if (selected === day.dateString) {
          initiateSelectedArray[month.monthyear()]["week" + iweek][
            day.dateString
          ] = true;
        } else {
          initiateSelectedArray[month.monthyear()]["week" + iweek][
            day.dateString
          ] = false;
        }
      }
      iweek = iweek + 1;
    }
  }
  return initiateSelectedArray;
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

const getcalendarmonths = (mode, cdates) => {
  let earlyday;
  let lastday;

  if (mode == "Initiate") {
    const mday = new Date(Date.now() - nummonths * 30 * 24 * 60 * 60 * 1000);
    earlyday = new Date(mday.getFullYear(), mday.getMonth(), 1, 12, 0, 0);

    const laterday = new Date(
      Date.now() + nummonths * 30 * 24 * 60 * 60 * 1000
    );
    const monthsdayarr = monthdaysinyear(laterday.getFullYear());
    const lateday = new Date(
      laterday.getFullYear(),
      laterday.getMonth(),
      monthsdayarr[laterday.getMonth()],
      12,
      0,
      0
    );
    lastday = new Date(
      lateday.getTime() + (6 - lateday.getDay()) * 24 * 60 * 60 * 1000
    );
  } else if (mode == "AddMonths") {
    const lastcurday = cdates.last().wkarr.last()[6];
    earlyday = new Date(lastcurday.timestamp + 24 * 60 * 60 * 1000);
    const laterday = new Date(
      earlyday.getTime() + nummonths * 30 * 24 * 60 * 60 * 1000
    );
    const monthsdayarr = monthdaysinyear(laterday.getFullYear());
    const lateday = new Date(
      laterday.getFullYear(),
      laterday.getMonth(),
      monthsdayarr[laterday.getMonth()],
      12,
      0,
      0
    );
    lastday = new Date(
      lateday.getTime() + (6 - lateday.getDay()) * 24 * 60 * 60 * 1000
    );
  } else if (mode == "AddPrevious") {
    const firstdaycustomobj = cdates[0].wkarr[0][0];

    const earlymonth = new Date(
      firstdaycustomobj.timestamp - nummonths * 30 * 24 * 60 * 60 * 1000
    );
    earlyday = new Date(
      earlymonth.getFullYear(),
      earlymonth.getMonth(),
      1,
      12,
      0,
      0
    );
    lastday = new Date(firstdaycustomobj.timestamp - 24 * 60 * 60 * 1000);
  }
  // ====================================================
  let firstsundaytime;
  if (earlyday.getDay() == 0) {
    firstsundaytime = earlyday.getTime();
  } else {
    firstsundaytime =
      earlyday.getTime() + (7 - earlyday.getDay()) * 24 * 60 * 60 * 1000;
  }

  let curday = new Date(firstsundaytime);
  // curday is the first Sunday
  // earlyday indicates the first of the month so month and year can be extracted
  let curMonth = earlyday.getMonth();
  let curYear = earlyday.getFullYear();

  let newmonth = true;
  const monthstoadd = [];

  let cmonth;
  // console.log(curday);
  // console.log(lastday);
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
      cmonth.generatelayout();
      newmonth = true;
      curMonth = newMonday.month;
      curYear = newMonday.year;
    }
  }

  
  return monthstoadd;
};

export default InfiScrollCalendar;
