package com.fluxum.controller;

import com.fluxum.model.enums.Currency;
import com.fluxum.model.enums.OnboardingStage;
import com.fluxum.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( "/user" )
public class UserController
{
    private final UserService userService;
    
    public UserController( UserService userService ) {this.userService = userService;}
    
    @GetMapping( "/get-onboarding-stage" )
    public ResponseEntity<Integer> getOnboardingStageStatus( Authentication authentication )
    {
        Long userId = Long.valueOf( authentication.getName() );
        
        OnboardingStage onboardingStage = userService.getOnboardingStage( userId );
        
        return ResponseEntity.ok().body( onboardingStage.getStage() );
    }
    
    @GetMapping( "/get-user-currency" )
    public ResponseEntity<Currency> getUserCurrency( Authentication authentication )
    {
        Long userId = Long.valueOf( authentication.getName() );
        
        Currency userCurrency = userService.getUserCurrency( userId );
        
        return ResponseEntity.ok().body( userCurrency );
    }    
}