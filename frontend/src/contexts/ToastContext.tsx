import { createContext, useState, ReactNode } from "react";
import { Toast, ToastVariant} from "../components/common/Toast/Toast";

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

// todo: export function ToastProvider