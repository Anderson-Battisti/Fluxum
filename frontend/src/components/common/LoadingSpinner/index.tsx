import styles from './styles.module.css'
import {ImSpinner2} from "react-icons/im";

export function LoadingSpinner()
{
    return(
        <div className={ styles.loading_overlay }>
            <ImSpinner2 className={ styles.spinner } />
        </div>
    );
}