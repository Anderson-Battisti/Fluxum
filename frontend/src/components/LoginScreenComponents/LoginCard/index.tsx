// @ts-ignore
import styles from './styles.module.css';
import { LoginCardHeader } from './LoginCardHeader';
import { TextInputField } from "../../CommonComponents/TextInputField";
import { useTranslation } from "react-i18next";

export function LoginCard()
{
    const { t } = useTranslation( "common" )
    
    return (
        <div className={ styles.container } >
            <LoginCardHeader />
            <TextInputField type={ "email" } placeholder={ "Email" } floatingLabel={ "Email" }  />
            <TextInputField type={ "password" } placeholder={ t( "password" ) } floatingLabel={ t( "password" ) } />
            {/*<LoginButton />
            <Separator />
            <GoogleLoginButton />
            <FooterInfo />*/}
        </div>
    )
}