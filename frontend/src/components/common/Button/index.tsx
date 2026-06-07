// @ts-ignore
import styles from './styles.module.css';
import { ButtonVariants } from "./ButtonVariants";
import { ReactNode } from "react";

interface ButtonProps
{
    label: string;
    variant: ButtonVariants;
    icon?: ReactNode;
    onClickButton: () => void;
}

export function Button( { label, variant, icon, onClickButton }: ButtonProps )
{
    return (
        <button className={ `${ styles.button } ${ styles[ variant ] }` } onClick={ onClickButton } >
            { icon && icon }
            <span>{ label }</span>
        </button>
    )
}