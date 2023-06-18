import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { HomeRoute } from "./routes/HomeRoute";
import { CreateNotepadRoute } from "./routes/CreateNotepadRoute";
import { ViewNotepadRoute } from "./routes/ViewNotepadRoute";
import { EditNotepadRoute } from "./routes/EditNotepadRoute";
import { NotepadPageRoute } from "./routes/NotepadPageRoute";

function App() {
  return (
    <BrowserRouter>
      <body>
        <AppBar />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/criar-notepad" element={<CreateNotepadRoute />} />
          <Route path="/visualizar-notepad/:id" element={<ViewNotepadRoute />} />
          <Route path="/editar-notepad/:id" element={<EditNotepadRoute />} />
          <Route path="/notepads/:page" element={<NotepadPageRoute />} />
        </Routes>
      </body>
    </BrowserRouter>
  );
}

export default App;
