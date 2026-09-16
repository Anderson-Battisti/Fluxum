import styles from './styles.module.css';

interface SeparatorProps
{
    text: string;
}

export function Separator( { text }: SeparatorProps )
{
    return (
        <div className={ styles.separator } >
            <span>{ text.toUpperCase() }</span>
        </div>
    )
}