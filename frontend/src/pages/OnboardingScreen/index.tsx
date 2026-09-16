import styles from '../../../styles/shared/screenBackground.module.css'
import {CurrencySelectorCard} from "../../components/OnboardingScreen/OnboardingCards/CurrencySelectorCard";

export function OnboardingScreen()
{
    return(
        <div className={ styles.container }>
            <CurrencySelectorCard />
        </div>
    )
}