import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

export default function ConnectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.formRow}>
          <View style={styles.formCell}>
            <Text>Adresse Mail : </Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.formCell}>
            <Text> Mot de passe : </Text>
            <TextInput style={styles.input}></TextInput>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("search")}
      >
        <Text>Connecter</Text>
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "grey",
    padding: 20,
  },
});
