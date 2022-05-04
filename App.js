import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import ConnectionScreen from "./screens/connection";
import SearchScreen from "./screens/search";
import TabScreen from "./screens/tab";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="connection" component={ConnectionScreen} />
        <Stack.Screen name="search" component={SearchScreen} />
        <Stack.Screen name="tab" component={TabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
