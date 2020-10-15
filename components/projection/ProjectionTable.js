import React from "react";
import { View, StyleSheet, FlatList, Text, Button } from "react-native";

import TableRow from "../../components/table/TableRow";
import TablePeriodRow from "../../components/table/TablePeriodRow";
import { projectionMatrix } from "../../definitions/ProjectionUtils";
import { PERIOD } from "../../definitions/Notices";
import { MonthName, monthdate } from "../../definitions/HMCalendarUtils";

const ProjectionTable = (props) => {
  if (props.schedule == "Pregnancy") {
    return (
      <FlatList
        data={Object.keys(projectionMatrix[props.schedule])}
        keyExtractor={(item, index) => "" + index}
        renderItem={({ item }) => (
          <TableRow
            entry={projectionMatrix[props.schedule][item].label}
            fields={addDays(
              projectionMatrix[props.schedule][item].days,
              props.curdateobj
            )}
            rowstyle={{ borderBottomWidth: 8 }}
          />
        )}
        style={{ width: "100%" }}
      />
    );
  }
  if (props.schedule == "Cycle") {
    const hercycle = {};
    for (const [date, note] of Object.entries(props.calendarnotes)) {
      if (note.includes(PERIOD)) {
        hercycle[date] = PERIOD;
      }
    }
    if (Object.keys(hercycle).length > 0) {
      const sumcycle = processPeriodData(hercycle);
      return (
        <View style={styles.dataview}>
          <FlatList
            data={Object.keys(sumcycle)}
            keyExtractor={(item, index) => "" + index}
            renderItem={({ item }) => (
              <TablePeriodRow
                monthyear={item}
                monthdaycount={sumcycle[item]["count"]}
                monthstartend={
                  monthdate(sumcycle[item]["periodstartdate"]) +
                  " - " +
                  monthdate(sumcycle[item]["periodenddate"])
                }
              />
            )}
            style={{ width: "100%" }}
          />
          <View>
            <Text> Sex dates</Text>
            <Button title='Populate dates on calendar'/>
          </View>
        </View>
      );
    }
    return <Text> Please go enter some period data</Text>;
  }
};

const processPeriodData = (hercycle) => {
  // reorder
  const sumcycle = {};
  const dates = [...Object.keys(hercycle)].sort();
  const [yr, mn, day] = dates[0].split("-");
  // periodstartdate
  let periodstartdate = new Date(1900, parseInt(mn) - 1, day, 12, 0, 0);
  let monthyear;
  for (const date of dates) {
    const [yr, mn, day] = date.split("-");
    const curdate = new Date(yr, parseInt(mn) - 1, day, 12, 0, 0);

    const dayssinceperiodstartday =
      (curdate.getTime() - periodstartdate.getTime()) / 1000 / 3600 / 24;
    if (dayssinceperiodstartday < 14) {
      sumcycle[monthyear]["count"] = sumcycle[monthyear]["count"] + 1;
      sumcycle[monthyear] = { ...sumcycle[monthyear], periodenddate: curdate };
    } else {
      monthyear = MonthName[curdate.getMonth()] + " " + curdate.getFullYear();
      if (monthyear in sumcycle) {
        monthyear = monthyear + "_2";
      }
      periodstartdate = new Date(yr, parseInt(mn) - 1, day, 12, 0, 0);
      sumcycle[monthyear] = { count: 1, periodstartdate: periodstartdate };
    }
  }

  // console.log(sumcycle)
  return sumcycle;
};

const addDays = (days, dateobj) => {
  const newtime = dateobj.getTime() + 60 * 60 * 24 * 1000 * days;
  const newdateobj = new Date(newtime);

  return newdateobj.toDateString();
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  projecttext: {
    fontSize: 16,
    alignSelf: "center",
  },
  mainview: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // borderWidth: 2,
  },
  dataview: {
    flex: 12,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    // borderWidth: 2,
    // backgroundColor:'yellow',
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
    // borderWidth: 2,
  },
  projecttable: {
    width: "100%",
    alignItems: "flex-start",
    // backgroundColor: "yellow",
    borderRadius: 10,
    // borderWidth:2,
    padding: 5,
  },
  projectionnbox: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    // borderColor: "black",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 20,
    margin: 10,
    height: 60,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProjectionTable;
