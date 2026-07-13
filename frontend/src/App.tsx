import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from "./pages/LoginScreen";
import {Dashboard} from "./pages/Dashboard";

export default function App() 
{
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Navigate to={ "/login" } /> } />
            <Route path="/login" element={ <LoginScreen /> } />
            <Route path="/dashboard" element={ <Dashboard /> } />
        </Routes>
    </BrowserRouter>
  )
}