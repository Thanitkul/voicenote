import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import ViewNote from "./pages/ViewNote";
import Register from "./pages/Register";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/view-note" element={<ViewNote />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
