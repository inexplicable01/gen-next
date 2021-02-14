import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ProjectionScreen from "../screens/ProjectionScreen";
import CalendarScreen from "../screens/CalendarScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import {Octicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarLabel: "Calendar",
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar-alt" color={color} size={size} />
            ),
          }}
        />
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
