import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNote";
import DetailNote from "./pages/DetailNote";

const App = () => {
  return (
    <div className="relative">
      <div className="-z-10 absolute inset-0 items-center px-5 py-24 w-full h-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#00FF9d10_100%)]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/note/:id" element={<DetailNote />} />
      </Routes>
    </div>
  );
};

export default App;
