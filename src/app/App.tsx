import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TaskBoard } from './pages/TaskBoard';
import { NewTask } from './pages/NewTask';
import { Workbench } from './pages/Workbench';
import { AdminTools } from './pages/AdminTools';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<TaskBoard />} />
        <Route path="/new-task" element={<NewTask />} />
        <Route path="/workbench/:id" element={<Workbench />} />
        <Route path="/admin" element={<AdminTools />} />
      </Routes>
    </BrowserRouter>
  );
}
