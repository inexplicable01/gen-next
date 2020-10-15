import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ExpoIcon from '../../components/UI/ExpoIcon'

const NoticeItem = (props) => {
  const [isExpand, setIsExpand] = useState(false);

  const toggleExpand = () => {
    setIsExpand(!isExpand);
  };
  //   console.log(props.notice);

  return (
    <View style={styles.categorybox}>
      <TouchableOpacity style={styles.CategoryTitleView} onPress={() => toggleExpand()}>
        <Text style={styles.CategoryText}>{props.notice}</Text>

        <View style={{ paddingRight: 10, alignSelf: "center" }}>
            <ExpoIcon
              name={isExpand ? "downcircleo" : "upcircleo"}
              iconstyle={styles.DisplayerArrow}
              iconfamily="AntDesign"
              size={20}
            />
      </View>
      </TouchableOpacity>
      {isExpand && (
        <FlatList
          data={props.liststr}
          keyExtractor={(list) => "" + list.name}
          renderItem={(list) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: "80%",
                alignSelf: "center",
              }}

              onPress={props.goEditMode.bind(this, list.item)}
            >
              <View
                style={{
                  flex: 8,
                  backgroundColor: props.color,
                  borderRadius: 10,
                  margin: 8,
                  padding: 3,
                }}
              >
                <Text style={{ margin: 3, fontSize: 16, alignSelf: "center" }}>
                  {list.item.name}
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ExpoIcon
                  name={list.item.icon}
                  iconfamily={list.item.iconfamily}
                  size={20}
                  iconstyle={styles.DisplayerArrow}
                  color={props.color}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  CategoryTitleView: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    // backgroundColor: 'red',
  },
  categorybox: {
    borderTopWidth: 2,
    // borderBottomWidth:2,
    borderColor: "black",
    marginBottom: 1,
  },
  CategoryText: {
    fontSize: 22,
    padding: 10,
  },
  DisplayerArrow: {
    fontSize: 20,
    padding: 10,
  },
});

export default NoticeItem;
