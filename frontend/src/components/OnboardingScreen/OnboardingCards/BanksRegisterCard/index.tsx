import shared from "../styles.module.css";
import styles from "./styles.module.css";
import {OnboardingCardHeader} from "../../Components/OnboardingCardHeader";
import {OnboardingProgressComponent} from "../../Components/OnboardingProgressComponent";
import {RiNumber1, RiNumber2, RiNumber3} from "react-icons/ri";
import {TextInputField} from "../../../common/TextInputField";
import {FieldInformation} from "../../Components/FieldInformation";
import {useTranslation} from "react-i18next";

export function BanksRegisterCard()
{
    const { t } = useTranslation( "onboarding" );
    
    return(
        <div className={ shared.container }>
            
            <OnboardingCardHeader />
            <OnboardingProgressComponent selectCurrencyIcon={ <RiNumber1 className={ shared.icon } size={ 15 } /> }
                                         registerBanksIcon={ <RiNumber2 className={ shared.icon } size={ 15 } /> }
                                         registerIncomeIcon={ <RiNumber3 className={ shared.icon } size={ 15 } /> }
                                         firstIconBackgroundColor={ "var( --blue )" }
                                         secondIconBackgroundColor={ "var( --blue )" }
                                         thirdIconBackgroundColor={ "var( --gray-300 )" } />
            <FieldInformation title={ t( "register_your_banks_and_balances" ) } 
                              subtitle={ t( "add_your_bank_accounts_and_their_current_balances" ) + ". " + t( "you_can_skip_this_step_and_add_them_later" ) } />
            <div className={ styles.input_fields_container }>
                <TextInputField className={ styles.bank_name_input_field } type={ "text" } floatingLabel={ t( "bank_name" ) } onTextChange={ () => {} } />
                <TextInputField type={ "text" } floatingLabel={ t( "balance" ) } onTextChange={ () => {} } />
            </div>
        </div>
    );
}