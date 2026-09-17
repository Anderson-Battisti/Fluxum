import styles from './styles.module.css';
import {IoMdCheckmark} from "react-icons/io";
import {ProgressCircle} from "../ProgressCircle";

export function OnboardingProgressComponent()
{
    // process/define the icon passed to the first circle
    // process/define the icon passed to the second circle
    // process/define the icon passed to the third circle
    
    return(
        <div className={ styles.container }>
            <div className={ styles.circle_label_container }>
                <ProgressCircle icon={ <IoMdCheckmark className={ styles.checked_icon } size={ 20 } /> } />
                <label>{"Select Currency"}</label>
            </div>
        </div>
    );
}