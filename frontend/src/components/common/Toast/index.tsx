import { Toast as ToastType } from '../../common/Toast/Toast';

interface ToastProps
{
    toast: ToastType;
    onDismiss: () => void;
}

export function Toast( { toast, onDismiss }: ToastProps )
{
    return(
        <div>
            <label>{ toast.message }</label>
        </div>
    )
}