import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Picker } from "react-native";
import Header from "../components/templates/Header";
import { useSelector } from "react-redux";
import TableRow from "../components/table/TableRow";
// import { Dropdown } from "react-native-material-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";
import { Switch } from "react-native-gesture-handler";

const pregancy = {
  pregancytest: { days: 14, label: "Pregancy Test" },
  trimester: { days: 90, label: "Trimester" },
  hundredtwentydays: { days: 120, label: "120 Days" },
  childbirth: { days: 270, label: "Child Birth" },
};

const injection = {
  pregancytest: { days: 25, label: "Pregancy Test" },
  trimester: { days: 90, label: "Trimester" },
  hundredtwentydays: { days: 120, label: "120 Days" },
  twohundreddays: { days: 200, label: "Two Hundred" },
  childbirth: { days: 280, label: "Child Birth" },
};

const ProjectionScreen = (props) => {
  const calendar = useSelector((state) => state.calendar);
  const [schedule, setSchedule] = useState(null);
  const [selectedValue, setSelectedValue] = useState("java");
  //   console.log(Object.entries(pregancy));

  useEffect(() => {
    // console.log("changed to", selectedValue);
    switch (selectedValue) {
      case "pregancy":
        setSchedule({
          ...pregancy,
        });
        break;
      case "injection":
        setSchedule({
          ...injection,
        });
    }
  }, [selectedValue]);

  // console.log(Object.keys(schedule));
  return (
    <View style={styles.mainview}>
      <Header extrastyles={{ flex: 1 }} title={"Projection"} />

      <View style={styles.content}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Select" value="select"  />
          <Picker.Item label="Pregancy" value="pregancy" />
          <Picker.Item label="Injection" value="injection" />
        </Picker>

        <Text>Project from : {calendar.selected}</Text>

        <View style={styles.dataview}>
          {schedule ? (
            <View style={styles.projecttable}>
              <TableRow
                entry={"Event"}
                fields={"Projection Date"}
                header={true}
              />
              <FlatList
                data={Object.keys(schedule)}
                keyExtractor={(item, index) => "" + index}
                renderItem={({ item }) => (
                  <TableRow
                    entry={schedule[item].label}
                    fields={addDays(schedule[item].days, calendar.curdateobj)}
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
    borderRadius:10,
    // borderWidth:2,
    padding:5
  },
  content: {
    width: "100%",
    // borderWidth: 2,
    // backgroundColor:'yellow',
    flex: 12,
    justifyContent: "center",
    alignItems: "center",
    margin:20,
  },
});

export default ProjectionScreen;
