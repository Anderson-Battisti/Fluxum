import {createContext, ReactNode, useState} from "react";
import {Toast, ToastVariant} from "../components/common/Toast/Toast";

interface ToastContextValue
{
    toasts: Toast[];
    addToast: ( message: string, variant?: ToastVariant ) => void;
}

export const ToastContext = createContext<ToastContextValue | null>( null );

interface ToastProviderProps
{
    children: ReactNode;
}

export function ToastProvider( { children }: ToastProviderProps )
{
    const [ toasts, setToasts ] = useState<Toast[]>( [] );
    
    function addToast( message: string, variant: ToastVariant = ToastVariant.SUCCESS )
    {
        const newToast: Toast = { id: crypto.randomUUID(), message, variant, isLeaving: false }
        
        setToasts( prevState => [ ...prevState, newToast ] );
    }
     
    return(
        <ToastContext.Provider value={ { toasts, addToast } } >
            { children }
        </ToastContext.Provider>
    )
}