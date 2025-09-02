import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import type { NoteType } from "./HomePage";

const DetailNote = () => {
  const [note, setNote] = useState<NoteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch the note!");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${note?._id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note!");
    }
  };

  const handleSave = async () => {
    if (!note?.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content!");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error updating note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-base-200 min-h-screen">
        <LoaderIcon className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="mx-auto px-4 py-8 container">
        <div className="flex justify-between items-center mb-6">
          <Link to={"/"} className="btn btn-ghost">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <button onClick={handleDelete} className="btn-outline btn btn-error">
            <Trash2Icon className="size-5" />
            Delete Note
          </button>
        </div>
        <div className="bg-base-100 card">
          <div className="card-body">
            <div className="mb-4 fieldset">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Note Title"
                className="input-bordered w-full input"
                value={note?.title}
                onChange={(e) =>
                  setNote((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev
                  )
                }
              />
            </div>

            <div className="mb-4 fieldset">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                placeholder="Write your note here..."
                className="textarea-bordered w-full h-32 textarea"
                value={note?.content}
                onChange={(e) =>
                  setNote((prev) =>
                    prev ? { ...prev, content: e.target.value } : prev
                  )
                }
              />
            </div>

            <div className="justify-end card-actions">
              <button
                onClick={handleSave}
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Note"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailNote;
