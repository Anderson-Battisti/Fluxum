import {useToast} from "../../../../hooks/useToast";
import {ToastContextValue} from "../../../../contexts/ToastContext";
import {Toast} from "../index";

export function ToastContainer()
{
    const { toasts, removeToast }: ToastContextValue = useToast();
    
    return(
        <div>
            { toasts.map( toast => ( <Toast toast={ toast } onDismiss={ () => removeToast( toast.id ) } /> ) ) }
        </div>
    )
}