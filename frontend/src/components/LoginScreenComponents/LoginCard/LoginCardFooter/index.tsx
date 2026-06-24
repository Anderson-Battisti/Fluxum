import styles from './styles.module.css';
import { useTranslation } from "react-i18next";
import { CardModes } from "../CardMode";
import { JSX } from "react";

interface LoginCardFooterProps
{
    cardMode: CardModes;
    onModeChange: ( mode: CardModes ) => void;
}

export function LoginCardFooter( { cardMode, onModeChange }: LoginCardFooterProps )
{
    const { t } = useTranslation( "login-screen" );
    
    let firstSpanContent: JSX.Element;
    let secondSpanContent: JSX.Element;
    
    if ( cardMode === CardModes.LOGIN_MODE )
    {
        firstSpanContent  = <span>{ t( "dont_have_an_account" ) }</span>;
        secondSpanContent = <span onClick={ () => handleClick( cardMode, onModeChange ) } className={ styles.sign_up_span }>{ t( "sign_up" ) }</span>;
    }
    
    else if ( cardMode === CardModes.SIGN_UP_MODE )
    {
        firstSpanContent  = <span>{ t( "already_have_an_account" ) }</span>;
        secondSpanContent = <span onClick={ () => handleClick( cardMode, onModeChange ) } className={ styles.sign_up_span }>{ t( "login" ) }</span>;
    }
    
    return (
        <div className={ styles.footer_div }>
            { firstSpanContent }
            { secondSpanContent }
        </div>
    )
}

function handleClick( cardMode: CardModes, onModeChange: ( mode: CardModes ) => void )
{
    const nextMode = cardMode == CardModes.LOGIN_MODE ? CardModes.SIGN_UP_MODE : CardModes.LOGIN_MODE;
    
    onModeChange( nextMode );
}