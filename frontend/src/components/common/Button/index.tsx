// @ts-ignore
import styles from './styles.module.css';
import { ButtonVariants } from "./ButtonVariants";
import { ReactNode } from "react";

interface ButtonProps
{
    label: string;
    variant: ButtonVariants;
    icon?: ReactNode;
}

export function Button( { label, variant, icon }: ButtonProps )
{
    return (
        <button className={ `${ styles.button } ${ styles[ variant ] }` } >
            { icon && icon }
            <span>{ label }</span>
        </button>
    )
}