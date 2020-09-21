import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Header from "../components/templates/Header";
import { useSelector } from "react-redux";
import TableRow from "../components/table/TableRow";
import { projectionMatrix } from "../definitions/ProjectionUtils";
// import { Dropdown } from "react-native-material-dropdown";

const ProjectionScreen = (props) => {
  const calendar = useSelector((state) => state.calendar);
  // const [schedule, setSchedule] = useState(null);
  const [schedule, setSchedule] = useState();
  //   console.log(Object.entries(pregancy));

  const schedulePress = (schedule) => {
    // console.log(schedule)
    setSchedule(schedule)
  }

  // useEffect(() => {
  //   // console.log("changed to", selectedSchedule);
  //   switch (selectedSchedule) {
  //     case "pregancy":
  //       setSchedule({
  //         ...pregancy,
  //       });
  //       break;
  //     case "injection":
  //       setSchedule({
  //         ...injection,
  //       });
  //   }
  // }, [selectedSchedule]);

  // console.log(projectionMatrix);
  return (
    <View style={styles.mainview}>
      <Header extrastyles={{ flex: 1 }} title={"Projection"} />

      <View style={styles.content}>
        <Text>Project from : {calendar.selected}</Text>
        <View
          style={{ width: "80%", backgroundColor: "grey", borderRadius: 10 }}
        >
          <FlatList
            data={Object.keys(projectionMatrix)}
            keyExtractor={(item) => {
              // console.log(item.monthno);
              return item;
            }}
            horizontal={true}
            renderItem={(projecttype, index, sep) => {
              // console.log(month.item.wkarr)
              return (
                <TouchableOpacity onPress={schedulePress.bind(this, projecttype.item)}
                  style={{
                    backgroundColor: "lightgrey",
                    padding: 10,
                    borderRadius: 10,
                    borderColor: "black",
                    borderWidth: 2,
                    margin: 10,
                    height: 60,
                    width: 120,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>{projecttype.item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.dataview}>
          {schedule ? (
            <View style={styles.projecttable}>
              <TableRow
                entry={"Event"}
                fields={"Projection Date"}
                header={true}
              />
              <FlatList
                data={Object.keys(projectionMatrix[schedule])}
                keyExtractor={(item, index) => "" + index}
                renderItem={({ item }) => (
                  <TableRow
                    entry={projectionMatrix[schedule][item].label}
                    fields={addDays(projectionMatrix[schedule][item].days, calendar.curdateobj)}
                  />
                )}
                style={{ width: "100%" }}
              />
            </View>
          ) : (
            <Text> Select a type of Projection</Text>
          )}
        </View>
      </View>
    </View>
  );
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
    justifyContent: "flex-start",
    alignItems: "center",
    width: "80%",
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
  content: {
    width: "100%",
    // borderWidth: 2,
    // backgroundColor:'yellow',
    flex: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});

export default ProjectionScreen;
