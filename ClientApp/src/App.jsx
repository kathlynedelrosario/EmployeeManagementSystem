import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Archive from "./pages/Archive";
import Reports from "./pages/Reports";
import MainLayout from "./MainLayout";
import Departments from "./pages/Departments";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Login does not use the sidebar */}
                <Route path="/" element={<Login />} />

                {/* Pages that use the shared sidebar */}
                <Route element={<MainLayout />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/employees"
                        element={<Employees />}
                    />

                    <Route
                        path="/reports"
                        element={<Reports />}
                    />

                    <Route
                        path="/archive"
                        element={<Archive />}
                    />

                    <Route
                        path="/departments"
                        element={<Departments />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;