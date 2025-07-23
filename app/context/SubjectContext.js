import React, { createContext, useEffect, useState } from "react";
import api from "../../services/api"; 

export const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);

  const markAttendance = async (id, isPresent) => {
        try {
            const attendedInc = isPresent ? 1 : 0;
            const totalInc = 1;

            const res = await api.patch(`/subjects/${id}/attendance`, {
            attendedInc,
            totalInc,
            });

            setSubjects((prev) =>
            prev.map((subj) => (subj._id === id ? res.data : subj))
            );
        } catch (err) {
            console.log("Error marking attendance:", err);
        }
    };
  // Fetch subjects from backend
  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data);
    } catch (err) {
      console.log("Error fetching subjects:", err);
    }
  };

  // Add new subject
  const addSubject = async (subject) => {
    try {
      const res = await api.post("/subjects", subject);
      setSubjects((prev) => [...prev, res.data]);
    } catch (err) {
      console.log("Error adding subject:", err);
    }
  };

  // Delete subject
  const deleteSubject = async (id) => {
    try {
      await api.delete(`/subjects/${id}`);
      setSubjects((prev) => prev.filter((subj) => subj._id !== id));
    } catch (err) {
      console.log("Error deleting subject:", err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        addSubject,
        deleteSubject,
        markAttendance,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};