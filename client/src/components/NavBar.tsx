import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center">
          <h1 className="font-mono font-bold text-primary text-3xl tracking-tight">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
