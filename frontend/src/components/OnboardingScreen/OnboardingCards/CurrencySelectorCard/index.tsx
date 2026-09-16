import styles from './styles.module.css';
import {OnboardingCardHeader} from "../../Components/OnboardingCardHeader";

export function CurrencySelectorCard()
{
    return(
        <div className={ styles.container }>
            <OnboardingCardHeader />
        </div>
    );
}