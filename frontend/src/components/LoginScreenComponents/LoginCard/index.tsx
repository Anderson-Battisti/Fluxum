// @ts-ignore
import styles from './styles.module.css';
import { LoginCardHeader } from './LoginCardHeader';

export function LoginCard()
{
    return (
        <div className={ styles.container } >
            <LoginCardHeader />
            {/*<EmailInputField />
            <LoginButton />
            <Separator />
            <GoogleLoginButton />
            <FooterInfo />*/}
        </div>
    )
}