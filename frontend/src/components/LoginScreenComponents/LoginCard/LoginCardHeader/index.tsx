import { useTranslation } from 'react-i18next';
import { APP_NAME } from '../../../../config/app';
// @ts-ignore
import styles from './styles.module.css';

export function LoginCardHeader()
{
    const { t } = useTranslation( 'login-screen' );

    return (
        <div className={ styles.card_header_container }>
            <span className={ styles.title_span }>{ APP_NAME }</span>
            <span className={ styles.subtitle_span }>{ t( "login_card_subtitle" ) }</span>
        </div>
    )
}