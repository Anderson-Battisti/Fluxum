// @ts-ignore
import styles from './styles.module.css';
import {LoginCardHeader} from './LoginCardHeader';
import {TextInputField} from "../../common/TextInputField";
import {useTranslation} from "react-i18next";
import {Button} from "../../common/Button";
import {ButtonVariants} from "../../common/Button/ButtonVariants";
import {Separator} from "./Separator";
import {FcGoogle} from "react-icons/fc";
import {LoginCardFooter} from "./LoginCardFooter";
import {useState} from "react";
import {CardModes} from "./CardMode";

export function LoginCard()
{
    const { t } = useTranslation( ["common", "login-screen"] );
    
    const [ mode,     setMode     ] = useState<CardModes>( CardModes.LOGIN_MODE );
    const [ email,    setEmail    ] = useState<string>( "" );
    const [ password, setPassword ] = useState<string>( "" );
    const [ confirmationPassword, setConfirmationPassword ] = useState<string>( "" );
    
    const mainButtonLabel: string = t( mode === CardModes.LOGIN_MODE   ? "login-screen:login" : 
                                       mode === CardModes.SIGN_UP_MODE ? "login-screen:create_account" : 
                                                                         "login-screen:verify_code" )
    
    function handleMainButtonClick()
    {
        if ( mode === CardModes.LOGIN_MODE )
        {
            if ( !email )
            {
                
            }
        }
        // todo fields validation
        
        // todo hit server side
    }
    
    return (
        <div className={ styles.container } >
            <LoginCardHeader />
            <TextInputField type={ "email" } placeholder={ "Email" } floatingLabel={ "Email" }  />
            <TextInputField type={ "password" } placeholder={ t( "password" ) } floatingLabel={ t( "password" ) } />
            { mode === CardModes.SIGN_UP_MODE && <TextInputField type={ "password" } floatingLabel={ t( "login-screen:confirm_password" ) } animatedField={ true } /> }
            <Button label={ mainButtonLabel } variant={ ButtonVariants.PRIMARY } onClickButton={ handleMainButtonClick } />
            {/* <LoginFailedMessage />*/}
            <Separator text={ t( "login-screen:or" ) } />
            <Button label={ t( "login-screen:continue_with_google" ) } variant={ ButtonVariants.SECONDARY } icon={ <FcGoogle /> } onClickButton={ () => {} } />
            <LoginCardFooter cardMode={ mode } onModeChange={ setMode } />
        </div>
    )
}