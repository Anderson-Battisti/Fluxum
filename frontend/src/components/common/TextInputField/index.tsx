import styles from './styles.module.css'

interface TextInputFieldProps
{
    type: "text" | "email" | "password"
    placeholder?: string
    floatingLabel?: string
    animatedField?: boolean
    onTextChange: ( text: string ) => void
}

export function TextInputField( { type, placeholder, floatingLabel, animatedField, onTextChange }: TextInputFieldProps )
{
    const handleChange = ( event: { target: { value: string } } ) => 
    {
        onTextChange( event.target.value )
    }
    
    return (
        <div className={ `${ styles.div } ${ animatedField ? styles.animated_field : '' }` } >
            
            <input className={ styles.input } type={ type } placeholder={ floatingLabel ? " " : placeholder } onChange={ handleChange } />
            
            { floatingLabel && <label className={ styles.floating_label } >{ floatingLabel }</label> }
        
        </div>
    )
}