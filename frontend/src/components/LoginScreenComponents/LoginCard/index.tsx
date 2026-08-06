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
import {useToast} from "../../../hooks/useToast";
import {ToastVariant} from "../../common/Toast/Toast";
import {ToastContextValue} from "../../../contexts/ToastContext";
import {useNavigate} from "react-router-dom";
import {HttpStatus} from "../../../constants/HttpStatus";
import { motion } from "framer-motion";

export function LoginCard()
{
    const sessionStorageKey: string = "fluxum_pending_email";
    
    const { t } = useTranslation( ["common", "login-screen"] );
    const { addToast }: ToastContextValue = useToast();
    const navigate = useNavigate();
    
    const [ mode,     setMode     ] = useState<CardModes>( getInitialCardMode() );
    const [ email,    setEmail    ] = useState<string>( getInitialEmail() );
    const [ password, setPassword ] = useState<string>( "" );
    const [ confirmationPassword, setConfirmationPassword ] = useState<string>( "" );
    const [ code, setCode ] = useState<string>( "" );
    const [ userCompleteName , setUserCompleteName ] = useState<string>( "" );
    
    const mainButtonLabel: string = t( mode === CardModes.LOGIN_MODE   ? "login-screen:login" : 
                                       mode === CardModes.SIGN_UP_MODE ? "login-screen:create_account" : 
                                                                         "login-screen:verify_code" )
    
    function getInitialCardMode(): CardModes
    {
        const savedEmail: string | null = sessionStorage.getItem( sessionStorageKey );
        
        return savedEmail !== null ? CardModes.VERIFYING_MODE : CardModes.LOGIN_MODE;
    }
    
    function getInitialEmail(): string
    {
        return sessionStorage.getItem( sessionStorageKey ) ?? "";
    }
    
    async function handleMainButtonClick()
    {
        if ( mode === CardModes.VERIFYING_MODE )
        {
            let localStorageEmail: string | null = localStorage.getItem( sessionStorageKey );
            
            if ( localStorageEmail === null )
            {
                setMode( CardModes.LOGIN_MODE ); return;
            }
            
            const response = await fetch( `${import.meta.env.VITE_API_URL}/auth/check-verification-code`,
                                           {
                                               method: "POST",
                                               headers: { "Content-Type": "application/json" },
                                               body: JSON.stringify( { email: localStorageEmail, code } ),
                                           } );
            
            if ( response.ok )
            {
                addToast( t( "login-screen:code_successfully_verified_you_can_now_login_and_start_using_fluxum" ), ToastVariant.SUCCESS );
                
                sessionStorage.removeItem( sessionStorageKey );
                
                setMode( CardModes.LOGIN_MODE ); return;
            }
            
            else if ( response.status === HttpStatus.NOT_FOUND )
            {
                addToast( t( "login-screen:there_is_no_verification_code_associated_with_this_email_address_please_sign_up_to_start_using_fluxum" ) );
                
                setMode( CardModes.SIGN_UP_MODE ); return;
            }
            
            else if ( response.status === HttpStatus.GONE )
            {
                addToast( t( "login-screen:the_code_you_entered_is_not_valid_please_request_a_new_verification_code" ), ToastVariant.WARNING ); return;
            }
            
            else if ( response.status === HttpStatus.BAD_REQUEST )
            {
                addToast( t( "login-screen:the_verification_code_you_entered_is_incorrect" ), ToastVariant.ERROR ); return;
            }
            
            else
            {
                addToast( t( "login-screen:an_error_occurred_while_processing_your_request_please_try_again_later" ), ToastVariant.ERROR ); return;
            }
        }
        
        if ( !email.includes( "." ) || !email.includes( "@" ) )
        {
            addToast( t( "login-screen:provide_a_valid_email_warning" ), ToastVariant.WARNING ); return;
        }
        
        if ( !password )
        {
            addToast( t( "login-screen:you_need_to_provide_the_email_and_password_to_log_in" ), ToastVariant.WARNING ); return;
        }
        
        if ( mode === CardModes.LOGIN_MODE )
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
                addToast( t( "login-screen:failed_to_log_in_invalid_credentials" ), ToastVariant.WARNING ); return;
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
                addToast( t( "login-screen:the_passwords_must_match" ), ToastVariant.WARNING ); return;
            }
            
            if ( userCompleteName.length === 0 || !userCompleteName.trim().includes( " " ) )
            {
                addToast( t( "login-screen:please_enter_your_full_name_to_register" ), ToastVariant.WARNING ); return;
            }
            
            const response = await fetch( `${import.meta.env.VITE_API_URL}/auth/send-verification-code`,
                                           {
                                               method: "POST",
                                               headers: { "Content-Type": "application/json" },
                                               body: JSON.stringify( { email, password, name: userCompleteName } )
                                           } );
            
            if ( response.ok )
            {
                sessionStorage.setItem( sessionStorageKey, email );
                
                setMode( CardModes.VERIFYING_MODE ); return;
            }
            
            else if ( response.status === HttpStatus.TOO_MANY_REQUESTS )
            {
                addToast( t( "login-screen:please_wait_before_requesting_another_verification_code" ), ToastVariant.WARNING );
                
                setMode( CardModes.VERIFYING_MODE ); return;
            }
            
            else if ( response.status === HttpStatus.CONFLICT )
            {
                addToast( t( "login-screen:we_could_not_create_an_account_because_this_email_is_already_registered_in_the_system" ), ToastVariant.ERROR ); return;
            }
            
            else
            {
                addToast( t( "login-screen:an_error_occurred_while_processing_your_request_please_try_again_later" ), ToastVariant.ERROR ); return;
            }
        }
    }
    
    return (
        <motion.div layout transition={ { duration: 0.3, ease: "easeInOut" } } className={ styles.container } >
            <LoginCardHeader />
            { mode !== CardModes.VERIFYING_MODE && <TextInputField type={ "email"    } placeholder={ "Email" } floatingLabel={ "Email" } onTextChange={ setEmail } /> }
            { mode !== CardModes.VERIFYING_MODE && <TextInputField type={ "password" } placeholder={ t( "password" ) } floatingLabel={ t( "password" ) } onTextChange={ setPassword } /> }
            { mode === CardModes.SIGN_UP_MODE   && <TextInputField type={ "password" } floatingLabel={ t( "login-screen:confirm_password" ) } animatedField={ true } onTextChange={ setConfirmationPassword } /> }
            { mode === CardModes.SIGN_UP_MODE   && <TextInputField type={ "text"     } floatingLabel={ "Nome Completo" } onTextChange={ setUserCompleteName } animatedField={ true } /> }
            { mode === CardModes.VERIFYING_MODE && <TextInputField type={ "text"     } floatingLabel={ t( "login-screen:verification-code" ) } onTextChange={ setCode } /> }
            <Button label={ mainButtonLabel } variant={ ButtonVariants.PRIMARY } onClickButton={ handleMainButtonClick } />
            <Separator text={ t( "login-screen:or" ) } />
            <Button label={ t( "login-screen:continue_with_google" ) } variant={ ButtonVariants.SECONDARY } icon={ <FcGoogle /> } onClickButton={ () => {} } />
            <LoginCardFooter cardMode={ mode } onModeChange={ setMode } />
        </motion.div>
    )
}