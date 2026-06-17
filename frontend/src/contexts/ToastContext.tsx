import {createContext, ReactNode, useState} from "react";
import {Toast, ToastVariant} from "../components/common/Toast/Toast";

export interface ToastContextValue
{
    toasts: Toast[];
    addToast: ( message: string, variant?: ToastVariant ) => void;
    removeToast: ( id: string ) => void;
}

export const ToastContext = createContext<ToastContextValue | null>( null );

interface ToastProviderProps
{
    children: ReactNode;
}

export function ToastProvider( { children }: ToastProviderProps )
{
    const [ toasts, setToasts ] = useState<Toast[]>( [] );
    
    function addToast( message: string, variant: ToastVariant = ToastVariant.INFO )
    {
        const newToast: Toast = { id: crypto.randomUUID(), message, variant, isLeaving: false }
        
        setTimeout( () => { removeToast( newToast.id ) }, 5500 );
        
        setToasts( prevState => [ ...prevState, newToast ] );
    }
    
    function removeToast( id: string )
    {
        setToasts( prevState => prevState.filter( toast => toast.id !== id ) )
    }
     
    return(
        <ToastContext.Provider value={ { toasts, addToast, removeToast } } >
            { children }
        </ToastContext.Provider>
    )
}