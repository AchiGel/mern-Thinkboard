import { PenSquareIcon, Trash2Icon } from "lucide-react";
import type { NoteType } from "../pages/HomePage";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({
  note,
  setNotes,
}: {
  note: NoteType;
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note!");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="bg-base-100 hover:shadow-lg border-[#00FF9D] border-t-4 border-solid transition-all duration-200 card"
    >
      <div className="card-body">
        <h3 className="text-base-content card-title">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="justify-between items-center mt-4 card-actions">
          <span className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="text-error btn btn-ghost btn-xs"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
