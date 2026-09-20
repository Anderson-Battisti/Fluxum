import styles from './styles.module.css'
import {useTranslation} from "react-i18next";

export function OnboardingCardHeader()
{
    const { t } = useTranslation( 'onboarding' )
    
    return(
        <div className={ styles.card_header_container }>
            <label className={ styles.card_header_title }>{ t( "welcome_to_fluxum" ) }</label>
            <label className={ styles.card_header_subtitle }>{ t( "lets_step_up_your_account_in_a_few_simple_steps" ) }</label>
        </div>
    );
}