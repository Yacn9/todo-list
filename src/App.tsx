import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "components";
import { Home, Todo } from "pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
