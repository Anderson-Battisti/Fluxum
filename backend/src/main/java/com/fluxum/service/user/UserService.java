package com.fluxum.service.user;

import com.fluxum.model.User;
import com.fluxum.model.enums.Currency;
import com.fluxum.model.enums.OnboardingStage;
import com.fluxum.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    
    /* Important: the database operation is being concluded here, spring is in charge to do it, this happens because @Transactional opens
       a database connection and if no exception occurs, so the operation is commited in database, otherwise a rollback() is executed 
    */
    @Transactional
    public void updateUserCurrency( Long userId, Currency currency )
    {
        User user = userRepository.findById( userId ).orElseThrow( () -> new IllegalStateException( "User not found for id: " + userId ) );
        
        user.setCurrency( currency );
        
        if ( user.getOnboardingStage() == OnboardingStage.NOT_STARTED )
        {
            user.setOnboardingStage( OnboardingStage.CURRENCY_SELECTED );
        }
    }
}