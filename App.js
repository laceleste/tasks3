import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Task from "./screens/TaskList";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Task">
        <Stack.Screen name="Task" component={Task} options={{ headerTintColor: "#F92E6A"}}/>
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
