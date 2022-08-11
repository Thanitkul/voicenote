import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import ViewNote from "./pages/ViewNote";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/view-note" element={<ViewNote />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
