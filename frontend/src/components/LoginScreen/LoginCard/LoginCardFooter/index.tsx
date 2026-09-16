import styles from './styles.module.css';
import {JSX} from "react";

interface LoginCardFooterProps
{
    setClickActionCallback: () => void;
    firstSpanContent: string;
    secondSpanContent: string;
}

export function LoginCardFooter( { setClickActionCallback, firstSpanContent, secondSpanContent }: LoginCardFooterProps )
{
    let firstSpan: JSX.Element;
    let secondSpan: JSX.Element;
    
    firstSpan  = <span className={ styles.first_span }>{ firstSpanContent }</span>;
    secondSpan = <span onClick={ () => handleClick( setClickActionCallback ) } className={ styles.link_span }>{ secondSpanContent }</span>;
    
    return (
        <div className={ styles.footer_div }>
            { firstSpan }
            { secondSpan }
        </div>
    )
}

function handleClick( setNextModeCallback: () => void )
{
    setNextModeCallback();
}