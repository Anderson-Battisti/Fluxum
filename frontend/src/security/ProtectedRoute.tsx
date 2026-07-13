/**
 * 
 * @author Anderson Battisti
 */
import { useEffect, useState } from "react";
import { HttpStatus } from "../constants/HttpStatus";
import { Navigate, Outlet } from "react-router-dom";

type AuthState = "loading" | "authenticated" | "unauthenticated";

export default function ProtectedRoute()
{
    const [ authState, setAuthState ] = useState<AuthState>( "loading" );
    
    useEffect( () =>
    {
        fetch( `${import.meta.env.VITE_API_URL}/auth/me`, { credentials: "include" } )
            .then( response =>
            {
                if ( response.status == HttpStatus.OK )
                {
                    setAuthState( "authenticated" )
                }
                
                else
                {
                    setAuthState( "unauthenticated" )
                }
            } )
            .catch( () =>
            {
                setAuthState( "unauthenticated" )
            } );
    }, [] );
    
    if ( authState === "loading" )
    {
        return null;
    }
    
    else if ( authState === "unauthenticated" )
    {
        return <Navigate to="/login" replace />;
    }
    
    return <Outlet />
}