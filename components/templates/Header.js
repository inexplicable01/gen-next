import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Header = (props) => {
  return (
    <View style={{ ...styles.mainview, ...props.extrastyles }}>
      <View style={styles.leftheader}>
        <Icon name="bars" size={24} />
      </View>
      <View style={styles.headerview}>
        <View style={styles.headerpic}>
          <Image
            source={require("../../assets/gnf_logo.png")}
            //   resizeMode='stretch'
            //   resizeMethod='auto'
            style={styles.headerimage}
          />
        </View>
        <Text style={styles.titletext}>{props.title}</Text>
      </View>
      <View style={styles.rightheader}>
        {/* <Text style={{textAlign:'right'}}>right</Text> */}
        <Icon name="star" size={24} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headertext: {
    fontSize: 16,
  },
  mainview: {
    // flex:1,
    flexDirection: "row",
    // height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  leftheader: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerpic: {
    flex: 2,
    // borderWidth:2,
    width: "100%",
    height: "100%",
    // backgroundColor:'tomato'
  },
  headerimage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  headerview: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titletext: {
    flex: 4,
    fontSize: 30,
    
  },
  rightheader: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default Header;
