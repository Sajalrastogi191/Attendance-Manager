const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

// GET all subjects
router.get("/", async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});

// POST new subject
router.post("/", async (req, res) => {
  const subject = new Subject(req.body);
  await subject.save();
  res.status(201).json(subject);
});

// DELETE subject by ID
router.delete("/:id", async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// routes/subjectRoutes.js

router.patch("/:id/attendance", async (req, res) => {
  const { id } = req.params;
  const { attendedInc, totalInc } = req.body;

  try {
    const subject = await Subject.findById(id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    subject.attended += attendedInc;
    subject.total += totalInc;

    await subject.save();
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});


module.exports = router;
