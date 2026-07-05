package com.fluxum.model.enums;

/**
 * 
 * @author Anderson Battisti
 */
public enum OnboardingStage
{
    NOT_STARTED              ( 0 ),
    CURRENCY_SELECTED        ( 1 ),
    BANKS_SELECTED           ( 2 ),
    INCOME_SOURCES_REGISTERED( 3 );
    
    OnboardingStage( int stage )
    {
        this.stage = stage;
    }
    
    private final int stage;
    
    public int getStage()
    {
        return this.stage;
    }
}
