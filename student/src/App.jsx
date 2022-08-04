import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import ViewNote from "./pages/ViewNote";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/view-note" element={<ViewNote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
