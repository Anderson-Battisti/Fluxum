import styles from './styles.module.css';
import {OnboardingCardHeader} from "../../Components/OnboardingCardHeader";
import {OnboardingProgressComponent} from "../../Components/OnboardingProgressComponent";
import {RiNumber1, RiNumber2, RiNumber3} from "react-icons/ri";

export function CurrencySelectorCard()
{
    return(
        <div className={ styles.container }>
            <OnboardingCardHeader />
            <OnboardingProgressComponent selectCurrencyIcon={ <RiNumber1 className={ styles.icon } size={ 15 } /> }
                                         registerBanksIcon={ <RiNumber2 className={ styles.icon } size={ 15 } /> }
                                         registerIncomeIcon={ <RiNumber3 className={ styles.icon } size={ 15 } /> }/>
        </div>
    );
}