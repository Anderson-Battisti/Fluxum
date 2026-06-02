// @ts-ignore
import styles from './styles.module.css';
import { LoginCardHeader } from './LoginCardHeader';
import { TextInputField } from "../../common/TextInputField";
import { useTranslation } from "react-i18next";
import { Button } from "../../common/Button";
import {ButtonVariants} from "../../common/Button/ButtonVariants";

export function LoginCard()
{
    const { t } = useTranslation( ["common", "login-screen"] );
    
    return (
        <div className={ styles.container } >
            <LoginCardHeader />
            <TextInputField type={ "email" } placeholder={ "Email" } floatingLabel={ "Email" }  />
            <TextInputField type={ "password" } placeholder={ t( "password" ) } floatingLabel={ t( "password" ) } />
            <Button label={ t( "login-screen:login" ) } variant={ ButtonVariants.PRIMARY } />
            {/*<Separator />
            <GoogleLoginButton />
            <FooterInfo />*/}
        </div>
    )
}