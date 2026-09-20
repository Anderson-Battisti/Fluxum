import styles from './styles.module.css';
import {IoMdCheckmark} from "react-icons/io";
import {ProgressCircle} from "../ProgressCircle";
import {Separator} from "../Separator";
import {useTranslation} from "react-i18next";
import {IconType} from "react-icons";
import {ReactNode} from "react";

interface OnboardingProgressComponentProps
{
    selectCurrencyIcon: ReactNode,
    registerBanksIcon: ReactNode,
    registerIncomeIcon: ReactNode
}

export function OnboardingProgressComponent( { selectCurrencyIcon, registerBanksIcon, registerIncomeIcon }: OnboardingProgressComponentProps )
{
    const { t } = useTranslation( 'onboarding' )
    
    return(
        <div className={ styles.container }>
            <div className={ styles.circle_label_container }>
                <ProgressCircle icon={ selectCurrencyIcon } backgroundColor={ "var( --blue )" } />
                <label className={ styles.label }>{ t( "select_currency" ) }</label>
            </div>
            <Separator width={ "100px" } color={ "var( --gray-200 )" } height={ "2px" } />
            
            <div className={ styles.container }>
                <ProgressCircle icon={ registerBanksIcon } backgroundColor={ "var( --gray-300 )" } />      
                <label className={ styles.label }>{ t( "register_banks" ) }</label>
            </div>
            <Separator width={ "100px" } color={ "var( --gray-200 )" } height={ "2px" } />
            
            <div className={ styles.container }>
                <ProgressCircle icon={ registerIncomeIcon } backgroundColor={ "var( --gray-300 )" } />      
                <label className={ styles.label }>{ t( "register_income" ) }</label>
            </div>
        </div>
    );
}