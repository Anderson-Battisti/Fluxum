import styles from './styles.module.css';
import {ProgressCircle} from "../ProgressCircle";
import {Separator} from "../Separator";
import {useTranslation} from "react-i18next";
import {ReactNode} from "react";

interface OnboardingProgressComponentProps
{
    selectCurrencyIcon: ReactNode,
    registerBanksIcon: ReactNode,
    registerIncomeIcon: ReactNode,
    firstIconBackgroundColor: string,
    secondIconBackgroundColor: string,
    thirdIconBackgroundColor: string
}

export function OnboardingProgressComponent( { selectCurrencyIcon, 
                                               registerBanksIcon, 
                                               registerIncomeIcon, 
                                               firstIconBackgroundColor, 
                                               secondIconBackgroundColor, 
                                               thirdIconBackgroundColor }: OnboardingProgressComponentProps )
{
    const { t } = useTranslation( 'onboarding' )
    
    return(
        <div className={ styles.container }>
            <div className={ styles.circle_label_container }>
                <ProgressCircle icon={ selectCurrencyIcon } backgroundColor={ firstIconBackgroundColor } />
                <label className={ styles.label }>{ t( "select_currency" ) }</label>
            </div>
            <Separator width={ "100px" } color={ "var( --gray-200 )" } height={ "2px" } />
            
            <div className={ styles.container }>
                <ProgressCircle icon={ registerBanksIcon } backgroundColor={ secondIconBackgroundColor } />      
                <label className={ styles.label }>{ t( "register_banks" ) }</label>
            </div>
            <Separator width={ "100px" } color={ "var( --gray-200 )" } height={ "2px" } />
            
            <div className={ styles.container }>
                <ProgressCircle icon={ registerIncomeIcon } backgroundColor={ thirdIconBackgroundColor } />      
                <label className={ styles.label }>{ t( "register_income" ) }</label>
            </div>
        </div>
    );
}