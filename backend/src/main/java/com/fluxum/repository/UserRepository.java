package com.fluxum.repository;

import java.util.Optional;

import jakarta.transaction.Transactional;

import com.fluxum.model.User;
import com.fluxum.model.enums.Currency;
import com.fluxum.model.enums.OnboardingStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * 
 * @author Anderson Battisti
 */
public interface UserRepository
    extends
        JpaRepository<User, Integer>
{
    Optional<User> findByEmail( String email );
    Optional<User> findByEmailAndEmailVerified( String email, boolean emailVerified );
    
    @Query( "select u.onboardingStage from User u where u.id = :userId" )
    Optional<OnboardingStage> findOnboardingStageById( @Param( "userId" ) Long userId ); 
    
    @Query( "select u.currency from User u where u.id = :userId" )
    Optional<Currency> findUserCurrencyById( @Param( "userId" ) Long userId );
    
    @Modifying
    @Transactional
    @Query( value = "update users set email_verified = true where email = :email", nativeQuery = true )
    int activateEmail( @Param( "email" ) String email );
}
