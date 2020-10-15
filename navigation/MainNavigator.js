import "react-native-gesture-handler";
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectionScreen from "../screens/ProjectionScreen";
// import CalendarScreen from "../screens/CalendarScreen";
import AgendaScreen from "../screens/AgendaScreen";
import CycleScreen from "../screens/CycleScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons , Octicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Agenda"
          component={AgendaScreen}
          options={{
            tabBarLabel: "Calendar",
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar-alt" color={color} size={size} />
            ),
          }}
        />
                {/* <Tab.Screen
          name="Cycle"
          component={CycleScreen}
          options={{
            tabBarLabel: "Your Cycle",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="perm-contact-calendar" size={size} color={color} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Projections"
          component={ProjectionScreen}
          options={{
            tabBarLabel: "Projections",
            tabBarIcon: ({ color, size }) => (
              <Octicons name="project" color={color} size={size}/>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
