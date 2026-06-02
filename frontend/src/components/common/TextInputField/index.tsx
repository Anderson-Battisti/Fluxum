// @ts-ignore
import styles from './styles.module.css'

interface TextInputFieldProps
{
    label?: string
    type: "text" | "email" | "password"
    placeholder?: string
    floatingLabel?: string
}

export function TextInputField( { label, type, placeholder, floatingLabel }: TextInputFieldProps )
{
    return (
        <div className={ styles.div } >
            
            { label && <label>{ label }</label> }
            
            <input className={ styles.input } type={ type } placeholder={ floatingLabel ? " " : placeholder } />
            
            { floatingLabel && <label className={ styles.floating_label } >{ floatingLabel }</label> }
        
        </div>
    )
}