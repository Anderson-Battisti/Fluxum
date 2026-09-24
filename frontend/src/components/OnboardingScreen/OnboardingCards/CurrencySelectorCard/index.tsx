import styles from './styles.module.css';
import {OnboardingCardHeader} from "../../Components/OnboardingCardHeader";
import {OnboardingProgressComponent} from "../../Components/OnboardingProgressComponent";
import {RiNumber1, RiNumber2, RiNumber3} from "react-icons/ri";
import {FieldInformation} from "../../Components/FieldInformation";
import {useTranslation} from "react-i18next";

export function CurrencySelectorCard()
{
    const { t } = useTranslation( 'onboarding' );
    
    return(
        <div className={ styles.container }>
            <OnboardingCardHeader />
            <OnboardingProgressComponent selectCurrencyIcon={ <RiNumber1 className={ styles.icon } size={ 15 } /> }
                                         registerBanksIcon={ <RiNumber2 className={ styles.icon } size={ 15 } /> }
                                         registerIncomeIcon={ <RiNumber3 className={ styles.icon } size={ 15 } /> }/>
            <FieldInformation title={ t( "choose_your_default_currency" ) } 
                              subtitle={ t( "set_the_default_currency_for_displaying_values_in_fluxum" ) + ". " + t( "you_can_change_this_option_at_any_time" ) + "." } />
        </div>
    );
}