import { useContext } from "react";
import { ToastContext, ToastContextValue } from "../contexts/ToastContext";

export function useToast()
{
    const context: ToastContextValue = useContext( ToastContext );
    
    if ( context === null ) throw new Error( 'useToast must be inside ToastProvider' );
    
    return context;
}