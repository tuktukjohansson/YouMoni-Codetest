// Author Marcus Johansson :))

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CurrentTempScreen from "./screens/CurrentTempScreen";
import ForecastScreen from "./screens/ForecastScreen.tsx";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} initialRouteName="CurrentTemp">
        <Stack.Screen name="CurrentTemp" component={CurrentTempScreen} />
        <Stack.Screen name="Forecast" component={ForecastScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
