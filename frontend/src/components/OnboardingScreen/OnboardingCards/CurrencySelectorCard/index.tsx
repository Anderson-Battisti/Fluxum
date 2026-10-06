import styles from './styles.module.css';
import {OnboardingCardHeader} from "../../Components/OnboardingCardHeader";
import {OnboardingProgressComponent} from "../../Components/OnboardingProgressComponent";
import {RiNumber1, RiNumber2, RiNumber3} from "react-icons/ri";
import {FieldInformation} from "../../Components/FieldInformation";
import {useTranslation} from "react-i18next";
import {Combobox} from "../../../common/Combobox";
import { Currency } from '../../../../models/Currency'
import {useEffect, useState} from "react";
import {LoadingSpinner} from "../../../common/LoadingSpinner";
import {ErrorModal} from "../../../common/ErrorModal";

export function CurrencySelectorCard()
{
    const { t } = useTranslation( [ "common", "onboarding" ] );
    
    const[ loading, setLoading ] = useState<boolean>( true );
    const[ error, setError ] = useState<boolean>( false );
    const [ selectedCurrency, setSelectedCurrency ] = useState<Currency | null>( null );
    
    useEffect( () =>
    {
        fetch( `${import.meta.env.VITE_API_URL}/user/get-user-currency`,
        {
            credentials: "include"
        } )
        .then( ( response =>
        {
            if ( !response.ok )
            {
                throw new Error( `HTTP ${ response.status }` );
            }
            
            return response.json();
        } ) )
        .then( ( codeISO: string ) =>
        {
            let currency: Currency | undefined = Currency.getCurrencyByCodeISO( codeISO );
            
            if ( !currency )
            {
                currency = Currency.BRL;
            }
            
            setSelectedCurrency( currency )
        } )
        .catch( () => setError( true ) )
        .finally( () => setLoading( false ) )
    }, [] );
    
    if ( loading )
    {
        return <LoadingSpinner />;
    }
    
    if ( error )
    {
        return <ErrorModal />;
    }
    
    return(
        <div className={ styles.container }>
            
            <OnboardingCardHeader />
            <OnboardingProgressComponent selectCurrencyIcon={ <RiNumber1 className={ styles.icon } size={ 15 } /> }
                                         registerBanksIcon={ <RiNumber2 className={ styles.icon } size={ 15 } /> }
                                         registerIncomeIcon={ <RiNumber3 className={ styles.icon } size={ 15 } /> }/>
            
            <FieldInformation title={ t( "onboarding:choose_your_default_currency" ) } 
                              subtitle={ t( "onboarding:set_the_default_currency_for_displaying_values_in_fluxum" ) + ". " + t( "onboarding:you_can_change_this_option_at_any_time" ) + "." } />
            
            <Combobox<Currency> label={ t( "common:currency" ) } 
                                comboboxOptions={ Currency.values() } 
                                value={ selectedCurrency }
                                getKey={ item => item.getCodeISO() }
                                renderOption={ item => <CurrencyOptionContent currency={ item } /> }
                                onSelect={ selectedCurrency => setSelectedCurrency( selectedCurrency ) }/>
        </div>
    );
    
    function CurrencyOptionContent( { currency }: { currency: Currency } )
    {
        return (
            <span className={ styles.option_content }>
                { currency.getIcon() }
                { t( "common:" + currency.getNameKey() ) }
            </span>
        );
    }
}

