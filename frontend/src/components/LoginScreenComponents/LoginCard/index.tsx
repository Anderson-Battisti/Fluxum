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
import {motion} from "framer-motion";

export function LoginCard()
{
    const { t } = useTranslation( ["common", "login-screen"] );
    const { addToast }: ToastContextValue = useToast();
    const navigate = useNavigate();
    
    const [ mode,     setMode     ] = useState<CardModes>( CardModes.LOGIN_MODE );
    const [ email,    setEmail    ] = useState<string>( "" );
    const [ password, setPassword ] = useState<string>( "" );
    const [ confirmationPassword, setConfirmationPassword ] = useState<string>( "" );
    const [ code, setCode ] = useState<string>( "" );
    const [ userCompleteName , setUserCompleteName ] = useState<string>( "" );
    
    const mainButtonLabel: string = t( mode === CardModes.LOGIN_MODE   ? "login-screen:login" : 
                                       mode === CardModes.SIGN_UP_MODE ? "login-screen:create_account" : 
                                                                         "login-screen:verify_code" );
    
    const handleKeyDown = async ( event: { key: string; } ) =>
    {
        if ( event.key === "Enter" )
        {
            await handleMainButtonClick();
        }
    }
    
    async function handleMainButtonClick()
    {
        if ( mode === CardModes.VERIFYING_MODE )
        {
            const response: Response = await fetch( `${import.meta.env.VITE_API_URL}/auth/check-verification-code`,
                                             {
                                                 method: "POST",
                                                 headers: { "Content-Type": "application/json" },
                                                 body: JSON.stringify( { email, verificationCode: code } ),
                                             } );
            
            if ( response.ok )
            {
                addToast( t( "login-screen:code_successfully_verified_you_can_now_login_and_start_using_fluxum" ), ToastVariant.SUCCESS );
                
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
        
        if ( !isEmailFieldValid() )
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
            
            else if ( response.status === HttpStatus.FORBIDDEN )
            {
                addToast( t( "login-screen:login_failed_email_not_yet_verified" ), ToastVariant.WARNING ); return;
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
            
            await requestVerificationCode();
        }
    }
    
    function isEmailFieldValid(): boolean
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test( email );
    }
    
    async function requestAnotherVerificationCode()
    {
        setUserCompleteName( "" );
        
        await requestVerificationCode();
    }
    
    async function requestVerificationCode(): Promise<void>
    {
        if ( isEmailFieldValid() )
        {
            const response: Response = await fetch( `${import.meta.env.VITE_API_URL}/auth/send-verification-code`,
                                                     {
                                                         method: "POST",
                                                         headers: { "Content-Type": "application/json" },
                                                         body: JSON.stringify( { email, password, name: userCompleteName } )
                                                     } );
            
            if ( response.ok )
            {
                setMode( CardModes.VERIFYING_MODE );
                
                addToast( t( "login-screen:we_sent_a_verification_code_to_your_email_check_your_inbox" ) );
            }
            
            else if ( response.status === HttpStatus.TOO_MANY_REQUESTS )
            {
                addToast( t( "login-screen:please_wait_before_requesting_another_verification_code" ), ToastVariant.WARNING );
                
                setMode( CardModes.VERIFYING_MODE );
            }
            
            else if ( response.status === HttpStatus.CONFLICT )
            {
                addToast( t( "login-screen:this_email_is_already_registered_in_the_system" ), ToastVariant.ERROR );
            }
            
            else if ( response.status === HttpStatus.UNPROCESSABLE_CONTENT )
            {
                addToast( t( "login-screen:there_is_no_account_registered_with_this_email_please_sign_up" ) );
                
                setMode( CardModes.SIGN_UP_MODE );
            }
            
            else
            {
                addToast( t( "login-screen:an_error_occurred_while_processing_your_request_please_try_again_later" ), ToastVariant.ERROR );
            }
        }
        
        else
        {
            addToast( t( "login-screen:enter_a_valid_email_to_resend_the_code" ), ToastVariant.WARNING );
        }
    }
    
    function setNextMode(): void
    {
        const nextMode = mode == CardModes.LOGIN_MODE ? CardModes.SIGN_UP_MODE : CardModes.LOGIN_MODE;
        
        setMode( nextMode );
    }
    
    function setVerifyingMode(): void
    {
        setMode( CardModes.VERIFYING_MODE );
    }
    
    return (
        <motion.div layout transition={ { duration: 0.3, ease: "easeInOut" } } className={ styles.container } onKeyDown={ handleKeyDown } >
            
            <LoginCardHeader />
            
            { <TextInputField type={ "email" } placeholder={ "Email" } floatingLabel={ "Email" } onTextChange={ setEmail } /> }
            
            { mode !== CardModes.VERIFYING_MODE && 
                <TextInputField type={ "password" } placeholder={ t( "password" ) } floatingLabel={ t( "password" ) } onTextChange={ setPassword } /> }
            
            { mode === CardModes.SIGN_UP_MODE && 
                <TextInputField type={ "password" } floatingLabel={ t( "login-screen:confirm_password" ) } animatedField={ true } onTextChange={ setConfirmationPassword } /> }
            
            { mode === CardModes.SIGN_UP_MODE && 
                <TextInputField type={ "text" } floatingLabel={ "Nome Completo" } onTextChange={ setUserCompleteName } animatedField={ true } /> }
            
            { mode === CardModes.VERIFYING_MODE && 
                <TextInputField type={ "text" } floatingLabel={ t( "login-screen:verification-code" ) } onTextChange={ setCode } /> }
            
            <Button label={ mainButtonLabel } variant={ ButtonVariants.PRIMARY } onClickButton={ handleMainButtonClick } />
            
            <Separator text={ t( "login-screen:or" ) } />
            
            <Button label={ t( "login-screen:continue_with_google" ) } variant={ ButtonVariants.SECONDARY } icon={ <FcGoogle /> } onClickButton={ () => {} } />
            
            <div style={ { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 5, paddingTop: 10 } }>
                
                <LoginCardFooter setClickActionCallback={ setNextMode } 
                                 firstSpanContent={ mode === CardModes.SIGN_UP_MODE || mode === CardModes.VERIFYING_MODE ? t( "login-screen:already_have_an_account" ) : t( "login-screen:dont_have_an_account" ) } 
                                 secondSpanContent={ mode === CardModes.SIGN_UP_MODE || mode === CardModes.VERIFYING_MODE ? t( "login-screen:login" ) : t( "login-screen:sign_up" ) }/>
    
                { mode !== CardModes.VERIFYING_MODE &&
                    <LoginCardFooter setClickActionCallback={ setVerifyingMode } firstSpanContent={ t( "login-screen:didnt_verify_your_email" ) } secondSpanContent={ t( "login-screen:verify_now" ) } /> }

                { mode === CardModes.VERIFYING_MODE && 
                    <LoginCardFooter setClickActionCallback={ requestAnotherVerificationCode } firstSpanContent={ t( "login-screen:didnt_receive_the_code" ) } secondSpanContent={ t( "login-screen:resend_code" ) } /> }
            </div>
        
        </motion.div>
    )
}