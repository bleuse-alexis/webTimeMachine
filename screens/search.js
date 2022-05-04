import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Search({ navigation }) {
  const [date, setDate] = useState(new Date(Date.now()));
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [site, setSite] = useState("");
  const [error, setError] = useState(null);

  const showPicker = () => {
    setIsPickerShow(true);
  };
  const onChange = (event, value) => {
    setDate(value);
    setIsPickerShow(false);
  };

  const onSend = async () => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (site === "") {
      setError("Url non remplit");
    } else {
      setError(null);

      let result = await fetch(
        `http://archive.org/wayback/available?url=${site}&timestamp=${year}${month}${day}`
      );

      const waybackSite = await result.json();
      await AsyncStorage.setItem(
        "@site",
        waybackSite.archived_snapshots.closest.url
      );
      await navigation.navigate("tab");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>Recherchez un site web a une certaine date</Text>
        <View style={styles.formRow}>
          <View style={styles.formCell}>
            <Text>Site Web : </Text>
            <TextInput
              style={styles.input}
              value={site}
              onChangeText={(newSite) => setSite(newSite)}
              keyboardType={"url"}
              placeholder={"google.com"}
            />

            {error && <Text style={{ color: "red" }}>{error}</Text>}
          </View>
          <View style={styles.formCell}>
            <Text> date : </Text>
            <TouchableOpacity style={styles.button} onPress={showPicker}>
              <Text>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {isPickerShow && (
              <DateTimePicker
                value={date}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={onChange}
                style={styles.DateTimePicker}
              />
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => onSend()}>
        <Text>Rechercher</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "space-around",
  },
  formRow: {
    flex: 1,
    flexDirection: "row",
  },
  formCell: {
    flex: 1,
  },
  input: {
    height: 60,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "grey",
    padding: 20,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
