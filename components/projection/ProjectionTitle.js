import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import TableRow from "../../components/table/TableRow";
import TablePeriodRow from "../../components/table/TablePeriodRow";
import { projectionMatrix } from "../../definitions/ProjectionUtils";
import { PERIOD } from "../../definitions/Notices";
import { MonthName } from "../../definitions/HMCalendarUtils";

const ProjectionTitle = (props) => {
  if (props.schedule == "Pregnancy") {
    return <TableRow entry={"Event"} fields={"Projection Date"} header={true} />

  }
  if (props.schedule == "Cycle") {
return <TablePeriodRow monthyear={"Cycle Month"} monthdaycount={'Count'} monthstartend={'Period Days'} header={true} />
  }
return <View  />
              
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default ProjectionTitle;
