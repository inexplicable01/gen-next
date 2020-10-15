import React from "react";
import { View, Text, StyleSheet } from "react-native";




const TableRow = (props) => {


  return (
    <View style={{...styles.tablerow, ...props.rowstyle}}>
      <View style={styles.column1}>
        <Text style={props.header? {...styles.column1text, fontWeight:'bold'}:styles.column1text}> {displayname(props.monthyear)}</Text>
      </View>
      <View style={styles.column2}>
        <Text style={props.header? {...styles.column2text, fontWeight:'bold'}:styles.column2text}> {props.monthdaycount}</Text>
      </View>
      <View style={styles.column2}>
        <Text style={props.header? {...styles.column2text, fontWeight:'bold'}:styles.column2text}> 
        {props.monthstartend}
        
        </Text>
      </View>
    </View>
  );
};

const displayname= (monthyear)=> {
  const names = monthyear.split('_')
  if (names.length ==1){
    return monthyear
  } else {
    return names[0] + ' 2nd'
  }
}


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
    // borderWidth:2,
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
