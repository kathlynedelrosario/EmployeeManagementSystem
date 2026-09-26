import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Archive from "./pages/Archive";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/archive" element={<Archive />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;