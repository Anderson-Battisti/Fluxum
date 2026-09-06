import { useContext } from "react";
import { ToastContext, ToastContextValue } from "../contexts/ToastContext";

/**
 * 
 * @author Anderson Battisti
 */
export function useToast()
{
    const context = useContext( ToastContext );
    
    if ( context === null ) throw new Error( 'useToast must be inside ToastProvider' );
    
    return context;
}