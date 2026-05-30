import { useTranslation } from 'react-i18next';
import { APP_NAME } from '../../../../config/app';
// @ts-ignore
import styles from './styles.module.css';

export function LoginCardHeader()
{
    const { t } = useTranslation( 'login-screen' );

    return (
        <div className={ styles.card_header_container }>
            <label className={ styles.title_label }>{ APP_NAME }</label>
            <label className={ styles.subtitle_label }>{ t( 'login_card_subtitle' ) }</label>
        </div>
    )
}