import styles from '../../../styles/shared/screenBackground.module.css'
import {CurrencySelectorCard} from "../../components/OnboardingScreen/OnboardingCards/CurrencySelectorCard";
import {OnboardingStage} from "../../components/LoginScreen/LoginCard/OnboardingStage";
import {useEffect, useState} from "react";
import {LoadingSpinner} from "../../components/common/LoadingSpinner";
import {ErrorModal} from "../../components/common/ErrorModal";

export function OnboardingScreen()
{
    const [ onboardingStage, setOnboardingStage ] = useState<number | null>( null );
    const [ error, setError ] = useState<boolean>( false );
    const [ loading, setLoading ] = useState<boolean>( true );
    
    useEffect( () =>
    {
        async function fetchOnboardingStage()
        {
            try
            {
                const response: Response = await fetch( `${import.meta.env.VITE_API_URL}/user/get-onboarding-stage`,
                                                         {
                                                             credentials: "include"
                                                         } );
                
                if ( !response.ok )
                {
                    throw new Error( "Failed to fetch onboarding stage on API" )
                }
                
                const stage: number = await response.json();
                
                setOnboardingStage( stage );
            }
            
            catch
            {
                setError( true );
            }
            
            finally
            {
                setLoading( false );
            }
        }
        
        fetchOnboardingStage();
    }, [] );
    
    return(
        <div className={ styles.container }>
            { loading && <LoadingSpinner /> }
            { error && <ErrorModal /> }
            { onboardingStage != null && +onboardingStage === OnboardingStage.NOT_STARTED && <CurrencySelectorCard /> }
            {/*{ +onboardingStage === OnboardingStage.CURRENCY_SELECTED && //todo }*/}
            {/*{ +onboardingStage === OnboardingStage.BANKS_SELECTED && //todo }*/}
        </div>
    )
}