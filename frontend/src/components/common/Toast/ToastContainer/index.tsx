// @ts-ignore
import styles from './styles.module.css';
import {useToast} from "../../../../hooks/useToast";
import {ToastContextValue} from "../../../../contexts/ToastContext";
import {Toast} from "../index";

export function ToastContainer()
{
    const { toasts, removeToast }: ToastContextValue = useToast();
    
    return(
        <div className={ styles.container }>
            { toasts.map( toast => ( <Toast toast={ toast } onDismiss={ () => removeToast( toast.id ) } /> ) ) }
        </div>
    )
}