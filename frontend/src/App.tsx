import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from "./pages/LoginScreen";
import { Dashboard } from "./pages/Dashboard";
import ProtectedRoute from "./security/ProtectedRoute";
import PublicRoute from "./security/PublicRoute";

export default function App() 
{
  return (
    <BrowserRouter>
        
        <Routes>
            
            {/* If the user is authenticated, the system will throw the user to dashboard and refuse the access to these public routes */}
            <Route element={ <PublicRoute /> } >
                <Route path="/" element={ <Navigate to={ "/login" } /> } />
                <Route path="/login" element={ <LoginScreen /> } />
            </Route>

            {/* All routes inside ProtectedRoute element are protected and will check if the user is authenticated */}
            <Route element={ <ProtectedRoute /> } >
                <Route path="/dashboard" element={ <Dashboard /> } />
            </Route>

            {/* This route will redirect the user to the dashboard if the url is not valid (if any of the routes above correspond to the url), to avoid white page */}
            <Route path="*" element={ <Navigate to="/dashboard" replace /> } />
        
        </Routes>
    
    </BrowserRouter>
  )
}