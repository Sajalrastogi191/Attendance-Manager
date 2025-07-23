import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {SubjectProvider} from "../app/context/SubjectContext";

export default function Layout() {
  return (
    <SubjectProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#211e1e",
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#aaa",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="attendance"
          options={{
            headerShown: false,
            title: "Mark Attendance",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="checkbox-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="timetable"
          options={{
            title: "Timetable",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SubjectProvider>
  );
}
