import shared from "../styles.module.css";
import styles from "./styles.module.css";
import {OnboardingCardHeader} from "../../Components/OnboardingCardHeader";
import {OnboardingProgressComponent} from "../../Components/OnboardingProgressComponent";
import {RiNumber1, RiNumber2, RiNumber3} from "react-icons/ri";
import {TextInputField} from "../../../common/InputFields/TextInputField";
import {FieldInformation} from "../../Components/FieldInformation";
import {useTranslation} from "react-i18next";
import {Button} from "../../../common/Button";
import {ButtonVariants} from "../../../common/Button/ButtonVariants";
import {GoPlus} from "react-icons/go";
import {useEffect, useState} from "react";
import {ToastContextValue} from "../../../../contexts/ToastContext";
import {useToast} from "../../../../hooks/useToast";
import {ToastVariant} from "../../../common/Toast/Toast";
import {CurrencyInputField} from "../../../common/InputFields/CurrencyInputField";
import {Currency} from "../../../../models/Currency";

export function BanksRegisterCard()
{
    const { t } = useTranslation( "onboarding" );
    
    const { addToast }: ToastContextValue = useToast();
    
    const bankInputLine = () => ( { id: crypto.randomUUID(), bankName: "", bankBalance: 0 } );
    
    const [ bankInputs, setBankInputs ] = useState( [ bankInputLine() ] );
    const [ codeISO, setCodeISO ] = useState<string>( Currency.BRL.getCodeISO() );
    const [ currencyFieldValue, setCurrencyFieldValue ] = useState<number>( 0 );
    
    useEffect( () =>
    {
        fetch( `${import.meta.env.VITE_API_URL}/user/get-user-currency`,
        {
            credentials: "include"
        } )
        .then( response =>
        {
            if ( !response.ok )
            {
                throw new Error( `HTTP ${ response.status }` )
            }
            
            return response.json();
        } )
        .then( ( codeISOFromApi: string ) =>
        {
            let currency: Currency | undefined = Currency.getCurrencyByCodeISO( codeISOFromApi );
            
            if ( !currency )
            {
                currency = Currency.BRL;
            }
            
            setCodeISO( currency.getCodeISO() )
        } )
    }, [] );
    
    function addBankLine(): void
    {
        bankInputs.map( bankInput => 
        {
            console.log( bankInput );
            
            if ( bankInput.bankName.trim().length == 0 )
            {
                addToast( "Pode não man! Tem banco vazio e tu quer adicionar mais?", ToastVariant.WARNING ); 
                return;
            }
            
            setBankInputs( prevState => [ ...prevState, bankInputLine() ] );
        } )
    }
    
    function updateBankName(): void
    {
        
    }
    
    function updateBalance( cents: number ): void
    {
        setCurrencyFieldValue( cents );
    }
    
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
            <div className={ styles.input_list_container }>
                { bankInputs.map( line => (
                    <div key={ line.id } className={ styles.input_fields_container }>
                        <TextInputField className={ styles.bank_name_input_field } type={ "text" } floatingLabel={ t( "bank_name" ) } onTextChange={ () => updateBankName() } />
                        <CurrencyInputField type={ "text" } floatingLabel={ t( "balance" ) } onValueChange={ updateBalance } codeISO={ codeISO } value={ currencyFieldValue } />
                    </div>
                ) ) }
            </div>
            {/*<div className={ styles.input_fields_container }>*/}
            {/*    <TextInputField className={ styles.bank_name_input_field } type={ "text" } floatingLabel={ t( "bank_name" ) } onTextChange={ () => {} } />*/}
            {/*    <TextInputField type={ "text" } floatingLabel={ t( "balance" ) } onTextChange={ () => {} } />*/}
            {/*</div>*/}
            {/*{ bankInputs.map(  ) }*/}
            <Button label={ t( "add_bank" ) } variant={ ButtonVariants.TERTIARY } icon={ <GoPlus color={ "var( --white )" } style={ { width: 22, height: 22 } } /> } onClickButton={ () => addBankLine() } width={ "25%" } />
        </div>
    );
}