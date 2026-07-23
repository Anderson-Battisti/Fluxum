import styles from './styles.module.css';
import { LoginCardHeader } from './LoginCardHeader';
import { TextInputField } from "../../common/TextInputField";
import { useTranslation } from "react-i18next";
import { Button } from "../../common/Button";
import { ButtonVariants } from "../../common/Button/ButtonVariants";
import { Separator } from "./Separator";
import { FcGoogle } from "react-icons/fc";
import { LoginCardFooter } from "./LoginCardFooter";
import { useState } from "react";
import { CardModes } from "./CardMode";
import { useToast } from "../../../hooks/useToast";
import { ToastVariant } from "../../common/Toast/Toast";
import { ToastContextValue } from "../../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import { HttpStatus } from "../../../constants/HttpStatus";

export function LoginCard()
{
    const { t } = useTranslation( ["common", "login-screen"] );
    const { addToast }: ToastContextValue = useToast();
    const navigate = useNavigate();
    
    const [ mode,     setMode     ] = useState<CardModes>( CardModes.LOGIN_MODE );
    const [ email,    setEmail    ] = useState<string>( "" );
    const [ password, setPassword ] = useState<string>( "" );
    const [ confirmationPassword, setConfirmationPassword ] = useState<string>( "" );
    
    const mainButtonLabel: string = t( mode === CardModes.LOGIN_MODE   ? "login-screen:login" : 
                                       mode === CardModes.SIGN_UP_MODE ? "login-screen:create_account" : 
                                                                         "login-screen:verify_code" )
    
    async function handleMainButtonClick()
    {
        if ( mode === CardModes.VERIFYING_MODE )
        {
            // todo check code
        }
        
        if ( !email.includes( "." ) || !email.includes( "@" ) )
        {
            addToast( t( "login-screen:provide_a_valid_email_warning" ), ToastVariant.WARNING ); return;
        }
        
        if ( !password )
        {
            addToast( t( "login-screen:you_need_to_provide_the_email_and_password_to_log_in" ), ToastVariant.WARNING ); return;
        }
        
        else if ( mode === CardModes.LOGIN_MODE )
        {
            const response = await fetch( `${import.meta.env.VITE_API_URL}/auth/authenticate`, 
                                           {
                                               method: "POST",
                                               headers: { "Content-Type": "application/json" },
                                               body: JSON.stringify( { email, password } ),
                                               credentials: "include"
                                           } );
            
            if ( response.ok )
            {
                navigate( "/dashboard" );
            }
            
            else if ( response.status === HttpStatus.UNAUTHORIZED )
            {
                addToast( t( "login-screen:failed_to_log_in_invalid_credentials" ), ToastVariant.WARNING );
            }
        }
        
        else if ( mode === CardModes.SIGN_UP_MODE )
        {
            if ( !confirmationPassword )
            {
                addToast( t( "login-screen:please_enter_the_password_confirmation" ), ToastVariant.WARNING ); return;
            }
            
            if ( password.length < 8 || password.length > 128 )
            {
                addToast( t( "login-screen:the_passowrd_must_be_between_8_and_128_characters_long" ), ToastVariant.WARNING ); return;
            }
            
            if ( password != confirmationPassword )
            {
                addToast( t( "login-screen:the_passwords_must_match" ), ToastVariant.WARNING )
            }
            
            // todo hit api
        }
    }
    
    return (
        <div className={ styles.container } >
            <LoginCardHeader />
            <TextInputField type={ "email" } placeholder={ "Email" } floatingLabel={ "Email" } onTextChange={ setEmail } />
            <TextInputField type={ "password" } placeholder={ t( "password" ) } floatingLabel={ t( "password" ) } onTextChange={ setPassword } />
            { mode === CardModes.SIGN_UP_MODE && <TextInputField type={ "password" } floatingLabel={ t( "login-screen:confirm_password" ) } animatedField={ true } onTextChange={ setConfirmationPassword } /> }
            <Button label={ mainButtonLabel } variant={ ButtonVariants.PRIMARY } onClickButton={ handleMainButtonClick } />
            {/* <LoginFailedMessage />*/}
            <Separator text={ t( "login-screen:or" ) } />
            <Button label={ t( "login-screen:continue_with_google" ) } variant={ ButtonVariants.SECONDARY } icon={ <FcGoogle /> } onClickButton={ () => {} } />
            <LoginCardFooter cardMode={ mode } onModeChange={ setMode } />
        </div>
    )
}