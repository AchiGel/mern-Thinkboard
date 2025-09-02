import Note from "../models/Note.js";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found!" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getSingleNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createANote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();

    res
      .status(201)
      .json({ message: "Your note has been created successfully" });
  } catch (error) {
    console.error("Error in createANote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateANote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res
      .status(200)
      .json({ message: "Your note has been updated successfully" });
  } catch (error) {
    console.error("Error in updateANote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteANote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });

    res
      .status(200)
      .json({ message: "Your note has been deleted successfully" });
  } catch (error) {
    console.error("Error in deleteANote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
