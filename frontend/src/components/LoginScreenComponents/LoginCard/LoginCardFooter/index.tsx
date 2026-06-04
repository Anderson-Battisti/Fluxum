// @ts-ignore
import styles from './styles.module.css';
import { useTranslation } from "react-i18next";

export function LoginCardFooter()
{
    const { t } = useTranslation( "login-screen" );
    
    return (
        <div className={ styles.footer_div }>
            <span>{ t( "footer-text" ) }</span>
            <span className={ styles.sign_up_label }>{ t( "sign-up" ) }</span>
        </div>
    )
}