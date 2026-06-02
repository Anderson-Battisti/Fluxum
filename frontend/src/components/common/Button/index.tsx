// @ts-ignore
import styles from './styles.module.css';
import { ButtonVariants } from "./ButtonVariants";

interface ButtonProps
{
    label: string
    variant: ButtonVariants
}

export function Button( { label, variant }: ButtonProps )
{
    return (
        <button className={ `${ styles.button } ${ styles[ variant ] }` } >{ label }</button>
    )
}