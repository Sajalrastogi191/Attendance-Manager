import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useContext } from "react";
import { SubjectContext } from "../app/context/SubjectContext";

export default function Attendance() {
  const { subjects, markAttendance } = useContext(SubjectContext);

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.tittle}>Mark Attendance</Text>
      </View>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const percentage =
            item.total > 0 ? ((item.attended / item.total) * 100).toFixed(1) : "0.0";

          return (
            <View style={styles.card}>
              <Text style={styles.subject}>{item.name}</Text>
              <Text style={styles.status}>
                {item.attended}/{item.total} lectures ({percentage}%)
              </Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => markAttendance(item._id, true)}
                >
                  <Text style={styles.buttonText}>Present</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#c0392b" }]}
                  onPress={() => markAttendance(item._id, false)}
                >
                  <Text style={styles.buttonText}>Absent</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#211e1e",
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  tittle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  subject: { fontSize: 18, fontWeight: "bold" },
  status: { marginVertical: 8 },
  buttons: { flexDirection: "row", gap: 10 },
  button: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
