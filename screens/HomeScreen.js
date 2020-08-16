import React from 'react';
import {View,Text, StyleSheet} from 'react-native';


const HomeScreen = props =>{
    return <View style={styles.mainview}>
        <Text> Practice Practice</Text>
    </View>
}

const styles = StyleSheet.create( {
    text: {
        fontSize: 16
    },
    mainview: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    }
})


export default HomeScreen;