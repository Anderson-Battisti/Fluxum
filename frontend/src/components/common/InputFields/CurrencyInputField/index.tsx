import styles from '../styles.module.css';
import {useTranslation} from "react-i18next";

interface CurrencyInputFieldProps
{
    floatingLabel?: string
    animatedField?: boolean
    onValueChangeCallback: ( cents: number ) => void
    codeISO: string;
    valueInCents: number;
}

export function CurrencyInputField( { floatingLabel, animatedField, onValueChangeCallback, codeISO, valueInCents }: CurrencyInputFieldProps )
{
    const { i18n } = useTranslation( "onboarding" );
    
    const MAX_NUMBER_IN_CENTS: number = 99999999999;
    
    const handleChange = ( event: { target: { value: string } } ) =>
    {
        let rawValueInCents: string = event.target.value.replace( /\D/g, "" );
        
        onValueChangeCallback( Math.min( Number( rawValueInCents ), MAX_NUMBER_IN_CENTS ) );
    }
    
    function getFormatedValue(): string
    {
        const formatter = new Intl.NumberFormat( i18n.language, { style: "currency", currency: codeISO } );
        
        return formatter.format( valueInCents / 100 );
    }
    
    return (
        <div className={ `${ styles.div } ${ animatedField ? styles.animated_field : '' }` } >
            
            <input value={ getFormatedValue() } inputMode={ "numeric" } className={ styles.input } type={ "text" } onChange={ handleChange } />
            
            { floatingLabel && <label className={ styles.floating_label } >{ floatingLabel }</label> }
        
        </div>
    )
}