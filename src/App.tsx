import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "components";
import { Home, Todo } from "pages";

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
