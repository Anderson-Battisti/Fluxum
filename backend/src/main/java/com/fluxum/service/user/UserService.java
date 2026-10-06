package com.fluxum.service.user;

import com.fluxum.model.enums.Currency;
import com.fluxum.model.enums.OnboardingStage;
import com.fluxum.repository.UserRepository;
import org.springframework.stereotype.Service;

/**
 * 
 * @author Anderson Battisti
 */
@Service
public class UserService
{
    private UserRepository userRepository;
    
    public UserService( UserRepository userRepository )
    {
        this.userRepository = userRepository;
    }
    
    public OnboardingStage getOnboardingStage( Long userId )
    {
        return userRepository.findOnboardingStageById( userId ).orElseThrow( () -> new IllegalStateException( "User not found: " + userId ) );
    }
    
    public Currency getUserCurrency( Long userId )
    {
        return userRepository.findUserCurrencyById( userId ).orElseThrow( () -> new IllegalStateException( "User not found: " + userId ) );
    }
}