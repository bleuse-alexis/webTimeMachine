import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";

import * as WebBrowser from "expo-web-browser";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";

const GetFromStorage = async () => {
  const site = await AsyncStorage.getItem("@site");
  console.log(site);
  return site;
};

function WebNav({}) {
  const HandlePressButton = async () => {
    const site = await GetFromStorage();
    console.log(site);
    await WebBrowser.openBrowserAsync(site);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={HandlePressButton}>
        <Text>Afficher le site</Text>
      </TouchableOpacity>
    </View>
  );
}

function WebPreview() {
  const site = GetFromStorage();
  console.log(site);
  return <WebView style={styles.WebViewContainer} source={{ uri: site }} />;
}

function Params() {
  return (
    <View style={styles.container}>
      <Text>params page</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function WaybackTabs() {
  return (
    <Tab.Navigator
      initialRouteName="WebNav"
      screenOptions={{ tabBarActiveTintColor: "#e91e63" }}
    >
      <Tab.Screen
        name="WebNav"
        component={WebNav}
        options={{ tabBarLabel: "Navigator" }}
      />
      <Tab.Screen
        name="WebPreview"
        component={WebPreview}
        options={{ tabBarLabel: "Preview" }}
      />
      <Tab.Screen
        name="Params"
        component={Params}
        options={{ tabBarLabel: "Params" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "grey",
    padding: 20,
  },
  WebViewContainer: {
    flex: 1,
  },
});
