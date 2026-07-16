/**
 * 
 * @author Anderson Battisti
 */
import { useEffect, useState } from "react";
import { AuthState } from "./AuthState";
import { AuthenticationResolver } from "./AuthenticationResolver";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute()
{
    const[ authState, setAuthState ] = useState<AuthState>( "loading" )
    
    useEffect( () =>
    {
        AuthenticationResolver.getAuthState().then( fetchedState => setAuthState( fetchedState ) );
    }, [] )
    
    if ( authState === "loading" )
    {
        return null;
    }
    
    else if ( authState === "authenticated" )
    {
        return <Navigate to="/dashboard" replace />;
    }
    
    return <Outlet />
}