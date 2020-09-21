import "react-native-gesture-handler";
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectionScreen from "../screens/ProjectionScreen";
// import CalendarScreen from "../screens/CalendarScreen";
import AgendaScreen from "../screens/AgendaScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";


const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Agenda"
          component={AgendaScreen}
          options={{
            tabBarLabel: "HomeMadeCalendar",
            tabBarIcon: ({ color, size }) => (
              <Icon name="address-book" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Projections"
          component={ProjectionScreen}
          options={{
            tabBarLabel: "Projections",
            tabBarIcon: ({ color, size }) => (
              <Icon name="table" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
