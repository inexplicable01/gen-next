import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
    setSchedule(schedule);
  };
  const gotoCalendar = ()=>console.log('Go to calendar')
  return (
    <View style={styles.mainview}>
      <Header extrastyles={{ flex: 1 }} title={"Projection"} />
      <View style={{ backgroundColor: "#FF89DE", width: "100%" , paddingTop:4}}>
        <Text style={styles.projecttext}>
          Project from : <Text style={{color:'blue', textDecorationLine:'underline'}}  onPress={gotoCalendar}>{calendar.selected}</Text>
        </Text>
        <View style={{ width: "100%", borderRadius: 10 }}>
          <FlatList
            data={Object.keys(projectionMatrix)}
            keyExtractor={(item) => item}
            horizontal={true}
            renderItem={(projecttype, index, sep) => {
              return (
                <TouchableOpacity
                  onPress={schedulePress.bind(this, projecttype.item)}
                  style={
                    schedule == projecttype.item
                      ? { ...styles.projectionnbox, backgroundColor: "#547DEB" }
                      : styles.projectionnbox
                  }
                >
                  <Text style={
                    schedule == projecttype.item
                      ? { color:'white'}
                      : { color:'black' }
                  }>{projecttype.item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <TableRow entry={"Event"} fields={"Projection Date"} header={true} />
      </View>
      <View style={styles.dataview}>
        {schedule ? (
          <View style={styles.projecttable}>
            <FlatList
              data={Object.keys(projectionMatrix[schedule])}
              keyExtractor={(item, index) => "" + index}
              renderItem={({ item }) => (
                <TableRow
                  entry={projectionMatrix[schedule][item].label}
                  fields={addDays(
                    projectionMatrix[schedule][item].days,
                    calendar.curdateobj
                  )}
                  rowstyle={{ borderBottomWidth: 8 }}
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
    justifyContent: 'flex-start',
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
    shadowColor: 'black',
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

export default ProjectionScreen;
