import styles from './styles.module.css';
import { ButtonVariants } from "./ButtonVariants";
import { ReactNode } from "react";

interface ButtonProps
{
    label: string;
    variant: ButtonVariants;
    icon?: ReactNode;
    width?: string;
    onClickButton: () => void;
}

export function Button( { label, variant, icon, width, onClickButton }: ButtonProps )
{
    return (
        <button style={ { width } } className={ `${ styles.button } ${ styles[ variant ] }` } onClick={ onClickButton } >
            { icon && icon }
            <span>{ label }</span>
        </button>
    )
}