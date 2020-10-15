import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import Header from "../components/templates/Header";
import { useSelector } from "react-redux";
import TableRow from "../components/table/TableRow";
import { projectionMatrix } from "../definitions/ProjectionUtils";
import { useNavigation } from "@react-navigation/native";
import ProjectionTable from "../components/projection/ProjectionTable";
import ProjectionTitle from "../components/projection/ProjectionTitle";

import SuperText from "../components/UI/SuperText";
// import { Dropdown } from "react-native-material-dropdown";

const ProjectionScreen = (props) => {
  const calendar = useSelector((state) => state.calendar);
  // const [schedule, setSchedule] = useState(null);
  const [schedule, setSchedule] = useState("Cycle");
  const [boolstate, setBoolState] = useState({
    Pregnancy: false,
    Injection: false,
    IMP: false,
    Log: false,
    Aevent: false,
  });

  //   console.log(Object.entries(pregancy));
  const navigation = useNavigation();

  const schedulePress = (schedule) => {
    // console.log('wtf',schedule)
    setSchedule(schedule);
    setBoolState((boolstate) => {
      for (const key of Object.keys(boolstate)) {
        boolstate[key] = false;
        if (schedule === key) {
          boolstate[key] = true;
        }
      }
      return boolstate;
    });
  };

  const gotoCalendar = () => {
    navigation.navigate("Agenda");
  };
  // console.log("projection render", Date.now());
  // console.log('wtf', tf[projecttype.item][1])
  // console.log('boolstate',boolstate)
  return (
    <View style={styles.mainview}>
      <Header extrastyles={{ flex: 2 }} title={"Projection"} />
      <View style={styles.calendarcomp}>
        <View
          style={{ backgroundColor: "#FF89DE", width: "100%", paddingTop: 4 }}
        >
          <Text style={styles.projecttext}>
            Project from :{" "}
            <Text
              style={{ color: "blue", textDecorationLine: "underline" }}
              onPress={gotoCalendar}
            >
              {calendar.selected}
            </Text>
          </Text>
          {/* <Button title='ti' onPress={changeblah}/> */}
          <View style={{ width: "100%", borderRadius: 10 }}>
            <FlatList
              data={Object.keys(projectionMatrix)}
              keyExtractor={(item) => item}
              horizontal={true}
              renderItem={(projecttype, index, sep) => {
                // const blue = [0, 0, 0, 0, schedule===projecttype.item, 1, 1 ,1]
                const blue = schedule === projecttype.item;
                return (
                  <TouchableOpacity
                    onPress={schedulePress.bind(this, projecttype.item)}
                    style={
                      schedule == projecttype.item
                        ? {
                            ...styles.projectionnbox,
                            backgroundColor: "#547DEB",
                          }
                        : styles.projectionnbox
                    }
                  >
                    <SuperText
                      text={projecttype.item}
                      schedule={schedule}
                      deeper={boolstate}
                      // schedule = {schedule}
                      index={projecttype.index}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <ProjectionTitle schedule={schedule} />
        </View>
        <View style={styles.dataview}>
            {schedule ? (
              <ProjectionTable
                schedule={schedule}
                curdateobj={calendar.curdateobj}
                calendarnotes={calendar.calendarnotes}
              />
            ) : (
              <Text> Select a type of Projection</Text>
            )}
        </View>
      </View>
    </View>
  );
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
    // marginTop: 20,
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
  calendarcomp: {
    width: "100%",
    // borderWidth: 2,
    backgroundColor: "#F7E5F2",
    flex: 20,
    // padding: 10,
    // height:500,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProjectionScreen;
