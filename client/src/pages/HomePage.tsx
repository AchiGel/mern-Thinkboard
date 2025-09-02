import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

export type NoteType = {
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

const HomePage = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching notes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="mx-auto mt-6 p-4 max-w-7xl">
        {loading && (
          <div className="py-10 text-primary text-center">Loading...</div>
        )}

        {notes.length === 0 && <NotesNotFound />}

        {notes.length > 0 && (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
