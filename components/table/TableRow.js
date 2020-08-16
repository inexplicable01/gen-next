import React from "react";
import { View, Text, StyleSheet } from "react-native";



const TableRow = (props) => {

  // console.log(props.fields)
  return (
    <View style={styles.tablerow}>
      <View style={styles.column1}>
        <Text style={props.header? {...styles.column1text, fontWeight:'bold'}:styles.column1text}> {props.entry}</Text>
      </View>
      <View style={styles.column2}>
        <Text style={props.header? {...styles.column2text, fontWeight:'bold'}:styles.column2text}> {props.fields}</Text>
      </View>
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
  tablerow: {
    // borderWidth: 2,
    padding: 5,
    margin: 2,
    // width:'100%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:10,
    borderWidth:2,
    padding:5,
    borderColor:'gainsboro'
  },
  column1: {
    flex: 2,
  },
  column1text: {
    textAlign: "center",
  },
  column2: {
    flex: 3,
  },
  column2text: {
    textAlign: "center",
  },
});

export default TableRow;
