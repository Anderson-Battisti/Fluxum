import styles from './styles.module.css'

export function OnboardingCardHeader()
{
    return(
        <div className={ styles.card_header_container }>
            <label className={ styles.card_header_title }>Welcome to Fluxum</label>
            <label className={ styles.card_header_subtitle }>Let's step up your account in a few simple steps</label>
        </div>
    );
}