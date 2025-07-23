import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";
import axios from "axios";


export default function Timetable() {
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = "http://10.21.0.147:5000"; // Replace <YOUR-IP> with your local IP address

  const fetchPDF = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/timetable`);
      setPdfUri(`${API_URL}/uploads/${res.data.fileName}`);
    } catch (error) {
      console.log("Failed to fetch PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (result.assets && result.assets.length > 0) {
      const file = result.assets[0];

      const formData = new FormData();
      formData.append("timetable", {
        uri: file.uri,
        name: file.name,
        type: "application/pdf",
      } as any);

      try {
        await axios.post(`${API_URL}/api/timetable/upload-timetable`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        fetchPDF();
      } catch (error) {
        console.log("Upload failed:", error);
      }
    }
  };

  useEffect(() => {
    fetchPDF();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
          <Text style={styles.title}>Time Table</Text>
      </View>
      <Button title="Upload Timetable PDF" onPress={uploadPDF} />
      <View style={styles.subContainer}>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : pdfUri ? (
        <WebView
          originWhitelist={['*']}
          source={{ uri: pdfUri }}
          style={{ flex: 1 }}
        />
      ) : (
        <Text style={{ marginTop: 20 }}>No timetable uploaded.</Text>
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#211e1eff" },
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
  subContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
});
