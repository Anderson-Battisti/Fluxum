package com.fluxum.model.converters;

import java.util.Arrays;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import com.fluxum.model.enums.OnboardingStage;

/**
 * 
 * @author Anderson Battisti
 */
@Converter( autoApply = true )
public class OnboardingStageConverter
    implements
        AttributeConverter<OnboardingStage, Byte>
{
    @Override
    public Byte convertToDatabaseColumn( OnboardingStage onboardingStage )
    {
        if ( onboardingStage == null ) return null;
        
        return onboardingStage.getStage().byteValue();
    }
    
    @Override
    public OnboardingStage convertToEntityAttribute( Byte dbData )
    {
        if ( dbData == null ) return null;
        
        return Arrays.stream( OnboardingStage.values() )
                     .filter( onboardingStage -> onboardingStage.getStage().byteValue() == dbData )
                     .findFirst()
                     .orElseThrow( () -> new IllegalArgumentException( "Unknown OnboardingStage value: " + dbData ) );
    }
}