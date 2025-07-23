import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import  {SubjectContext}  from "../app/context/SubjectContext";

export default function Index() {
  const [subject, setSubject] = useState("");
  const [requiredPercentage, setRequiredPercentage] = useState("");

  const { subjects, addSubject, deleteSubject } = useContext(SubjectContext);

  const handleAddSubject = () => {
    if (subject.trim() === "" || requiredPercentage.trim() === "") return;

    addSubject({
      name: subject,
      percentage: requiredPercentage,
      attended: 0,
      total: 0,
    });

    setSubject("");
    setRequiredPercentage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.title}>Attendance Manager</Text>
      </View>

      <View style={styles.addSubContainer}>
        <View style={styles.containerr}>
          <Text style={styles.subtitle}>Add a Subject</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter subject name"
            value={subject}
            onChangeText={setSubject}
          />

          <TextInput
            style={styles.input}
            placeholder="Required attendance %"
            value={requiredPercentage}
            onChangeText={setRequiredPercentage}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleAddSubject}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>

          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.cellSubject]}>Subject</Text>
            <Text style={[styles.headerCell, styles.cellPercentage]}>Required %</Text>
            <Text style={[styles.headerCell, styles.cellDelete]}>Delete</Text>
          </View>

          <FlatList
            data={subjects}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.subjectRow}>
                <Text style={[styles.subjectCell, styles.cellSubject]}>{item.name}</Text>
                <Text style={[styles.subjectCell, styles.cellPercentage]}>
                  {item.percentage}%
                </Text>
                <TouchableOpacity
                  style={[styles.subjectCell, styles.cellDelete]}
                  onPress={() => deleteSubject(item._id)}
                >
                  <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#211e1eff",
  },
  bar: {
    marginTop: 20,
    height: 70,
    backgroundColor: "#211e1eff",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  addSubContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  containerr: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#232222ff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    paddingVertical: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 5,
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "center",
  },
  subjectRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 5,
  },
  subjectCell: {
    padding: 10,
    textAlign: "center",
  },
  cellSubject: {
    flex: 2,
  },
  cellPercentage: {
    flex: 1,
  },
  cellDelete: {
    flex: 0.7,
    alignItems: "center",
  },
});
