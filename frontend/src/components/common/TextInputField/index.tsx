// @ts-ignore
import styles from './styles.module.css'

interface TextInputFieldProps
{
    label?: string
    type: "text" | "email" | "password"
    placeholder?: string
    floatingLabel?: string
    animatedField?: boolean
}

export function TextInputField( { label, type, placeholder, floatingLabel, animatedField }: TextInputFieldProps )
{
    return (
        <div className={ ` ${ styles.div } ${ animatedField ? styles.animated_field : '' }` } >
            
            { label && <label>{ label }</label> }
            
            <input className={ styles.input } type={ type } placeholder={ floatingLabel ? " " : placeholder } />
            
            { floatingLabel && <label className={ styles.floating_label } >{ floatingLabel }</label> }
        
        </div>
    )
}