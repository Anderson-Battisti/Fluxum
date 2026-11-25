import styles from '../styles.module.css';

interface CurrencyInputFieldProps
{
    type: "text"
    placeholder?: string
    floatingLabel?: string
    animatedField?: boolean
    onValueChange: ( cents: number ) => void
    className?: string;
    codeISO: string;
    value: number;
}

export function CurrencyInputField( { type, placeholder, floatingLabel, animatedField, onValueChange, className = "", codeISO, value }: CurrencyInputFieldProps )
{
    const handleChange = ( event: { target: { value: string } } ) =>
    {
        let rawNumber = event.target.value.replace( /\D/g, "" );
        
        onValueChange( Number( rawNumber ) );
    }
    
    function getFormatedValue(): string
    {
        const formatter = new Intl.NumberFormat( "pt-BR", { style: "currency", currency: codeISO } );
        
        return formatter.format( value / 100 );
    }
    
    return (
        <div className={ `${ styles.div } ${ animatedField ? styles.animated_field : '' } ${ className }` } >
            
            <input value={ getFormatedValue() } inputMode={ "numeric" } className={ styles.input } type={ type } placeholder={ floatingLabel ? " " : placeholder } onChange={ handleChange } />
            
            { floatingLabel && <label className={ styles.floating_label } >{ floatingLabel }</label> }
        
        </div>
    )
}