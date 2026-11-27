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
import {PiTrashLight} from "react-icons/pi";
import {motion} from "framer-motion";

export function BanksRegisterCard()
{
    const { t } = useTranslation( "onboarding" );
    
    const { addToast }: ToastContextValue = useToast();
    
    const bankInputLine = () => ( { uuid: crypto.randomUUID(), bankName: "", bankBalance: 0 } );
    
    const [ bankInputs, setBankInputs ] = useState( [ bankInputLine() ] );
    const [ codeISO, setCodeISO ] = useState<string>( Currency.BRL.getCodeISO() );
    const [ uuidToBalanceMap, setUuidToBalanceMap ] = useState<Map<string, number>>( new Map() );
    
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
        const banksLimit: number = 10;
        
        const hasEmptyBank = bankInputs.some( bankInput => bankInput.bankName.trim().length === 0 );
        
        if ( bankInputs.length >= banksLimit )
        {
            addToast( t( "you_have_reached_the_maximum_number_of_banks"), ToastVariant.INFO );
            return;
        }
        
        if ( hasEmptyBank )
        {
            addToast( t( "fill_in_all_fields_to_add_a_new_one" ), ToastVariant.INFO ); 
            return;
        }
        
        setBankInputs( prevState => [ ...prevState, bankInputLine() ] );
    }
    
    function updateBankName( bankName: string, uuid: string ): void
    {
        setBankInputs( prevBanks => prevBanks.map( bank => 
        {
            if ( bank.uuid === uuid )
            {
                return { ...bank, bankName: bankName };
            }
            
            return bank;
        } ) )
    }
    
    function updateBalance( cents: number, uuid: string ): void
    {
        setUuidToBalanceMap( prevState =>
        {
            const updated: Map<string, number> = new Map<string, number>( prevState );
            
            updated.set( uuid, cents );
            
            return updated;
        } );
        
        setBankInputs( prevBanks => prevBanks.map( bank => 
        {
            if ( bank.uuid === uuid )
            {
                return { ...bank, bankBalance: cents };
            }
            
            return bank;
        } ) )
    }
    
    function handleBankRemoval( uuid: string )
    {
        setBankInputs( prevBanks => prevBanks.filter( bank => bank.uuid !== uuid ) );
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
                    <motion.div layout transition={ { duration: 0.4, ease: "easeInOut" } }  key={ line.uuid } className={ styles.input_fields_container }>
                        <TextInputField className={ styles.bank_name_input_field } 
                                        type={ "text" } 
                                        floatingLabel={ t( "bank_name" ) } 
                                        onTextChange={ ( text: string ) => updateBankName( text, line.uuid ) } />
                        <CurrencyInputField floatingLabel={ t( "balance" ) } 
                                            onValueChangeCallback={ ( cents: number ) => updateBalance( cents, line.uuid ) } 
                                            codeISO={ codeISO } 
                                            valueInCents={ uuidToBalanceMap.get( line.uuid ) ?? 0 } />
                        { bankInputs.length > 1 && <PiTrashLight className={ styles.trash_icon } onClick={ () => handleBankRemoval( line.uuid ) } /> }
                    </motion.div>
                ) ) }
            </div>
            <Button label={ t( "add_bank" ) } 
                    variant={ ButtonVariants.TERTIARY } 
                    icon={ <GoPlus color={ "var( --white )" } /> } 
                    onClickButton={ () => addBankLine() } 
                    width={ "25%" } />
        </div>
    );
}