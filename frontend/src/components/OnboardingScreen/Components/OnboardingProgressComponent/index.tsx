import styles from './styles.module.css';
import {IoMdCheckmark} from "react-icons/io";
import {ProgressCircle} from "../ProgressCircle";
import {Separator} from "../Separator";

export function OnboardingProgressComponent()
{
    // process/define the icon passed to the first circle
    // process/define the icon passed to the second circle
    // process/define the icon passed to the third circle
    
    return(
        <div className={ styles.container }>
            <div className={ styles.circle_label_container }>
                <ProgressCircle icon={ <IoMdCheckmark className={ styles.checked_icon } size={ 20 } /> } />
                <label className={ styles.label }>{ "Select Currency" }</label>
            </div>
            <Separator width={ "100px" } color={ "var( --gray-200 )" } height={ "2px" } />
            
            <div className={ styles.container }>
                <ProgressCircle icon={<IoMdCheckmark className={ styles.checked_icon } size={ 20 } /> } />      
                <label className={ styles.label }>Register Banks</label>
            </div>
            <Separator width={ "100px" } color={ "var( --gray-200 )" } height={ "2px" } />
            
            <div className={ styles.container }>
                <ProgressCircle icon={<IoMdCheckmark className={ styles.checked_icon } size={ 20 } /> } />      
                <label className={ styles.label }>Register Income Sources</label>
            </div>
        </div>
    );
}