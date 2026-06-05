import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from "./pages/LoginScreen";

export default function App() 
{
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Navigate to={ "/login" } /> } />
            <Route path="/login" element={ <LoginScreen /> } />
        </Routes>
    </BrowserRouter>
  )
}