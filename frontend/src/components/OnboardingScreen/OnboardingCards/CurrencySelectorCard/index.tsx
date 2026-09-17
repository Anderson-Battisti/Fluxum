import styles from './styles.module.css';
import {OnboardingCardHeader} from "../../Components/OnboardingCardHeader";
import {OnboardingProgressComponent} from "../../Components/OnboardingProgressComponent";

export function CurrencySelectorCard()
{
    return(
        <div className={ styles.container }>
            <OnboardingCardHeader />
            <OnboardingProgressComponent />
        </div>
    );
}