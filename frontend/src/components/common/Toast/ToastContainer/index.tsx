// @ts-ignore
import styles from './styles.module.css';
import {useToast} from "../../../../hooks/useToast";
import {ToastContextValue} from "../../../../contexts/ToastContext";
import {Toast} from "../index";
import {AnimatePresence} from "framer-motion";

export function ToastContainer()
{
    const { toasts, removeToast }: ToastContextValue = useToast();
    
    return(
        <div className={ styles.container }>
            <AnimatePresence>
                { toasts.map( toast => ( <Toast key={ toast.id } toast={ toast } onDismiss={ () => removeToast( toast.id ) } /> ) ) }
            </AnimatePresence>
        </div>
    )
}