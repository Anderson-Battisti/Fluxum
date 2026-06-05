package com.fluxum.model.converters;

import java.util.Arrays;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import com.fluxum.model.enums.OnboardingStage;

@Converter( autoApply = true )
public class OnboardingStageConverter
    implements
        AttributeConverter<OnboardingStage, Integer>
{
    @Override
    public Integer convertToDatabaseColumn( OnboardingStage onboardingStage )
    {
        if ( onboardingStage == null ) return null;
        
        return onboardingStage.getStage();
    }
    
    @Override
    public OnboardingStage convertToEntityAttribute( Integer dbData )
    {
        if ( dbData == null ) return null;
        
        return Arrays.stream( OnboardingStage.values() )
                     .filter( onboardingStage -> onboardingStage.getStage() == dbData )
                     .findFirst()
                     .orElseThrow( () -> new IllegalArgumentException( "Unknown OnboardingStage value: " + dbData ) );
    }
}