import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from "./pages/LoginScreen";
import { Dashboard} from "./pages/Dashboard";
import ProtectedRoute from "./security/ProtectedRoute";

export default function App() 
{
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Navigate to={ "/login" } /> } />
            <Route path="/login" element={ <LoginScreen /> } />
            <Route element={ <ProtectedRoute /> } >
                <Route path="/dashboard" element={ <Dashboard /> } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}