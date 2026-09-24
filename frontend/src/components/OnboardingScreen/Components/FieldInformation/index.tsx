import styles from './styles.module.css';

interface FieldInformationProps
{
    title: string;
    subtitle: string;
}

export function FieldInformation( { title, subtitle }: FieldInformationProps )
{
    return(
        <div className={ styles.container }>
            <label className={ styles.title }>{ title }</label>
            <label className={ styles.subtitle }>{ subtitle }</label>
        </div>
    );
}