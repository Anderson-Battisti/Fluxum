package com.fluxum.controller;

import com.fluxum.dto.auth.AuthBodyDTO;
import com.fluxum.dto.auth.AuthTokensDTO;
import com.fluxum.dto.auth.SendVerificationCodeDTO;
import com.fluxum.dto.auth.UserRegistrationDTO;
import com.fluxum.exception.authentication.AuthenticationFailedException;
import com.fluxum.exception.authentication.CodeRequestBlockedException;
import com.fluxum.exception.authentication.UserAlreadyRegisteredException;
import com.fluxum.service.auth.AuthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( "/auth" )
public class AuthController
{
    private final AuthService authService;
    
    public AuthController( AuthService authService )
    {
        this.authService = authService;
    }
    
    @PostMapping( "/authenticate" )
    public ResponseEntity<Void> authenticate( @RequestBody AuthBodyDTO authBodyDTO )
    {
        try
        {
            AuthTokensDTO authTokens = authService.authenticate( authBodyDTO.email(), authBodyDTO.password() );
            
            ResponseCookie accessTokenCookie = ResponseCookie.from( "accessToken", authTokens.accessToken() )
                                                             .httpOnly( true )
                                                             .secure( false ) /* in production environment make it true! important! */
                                                             .sameSite( "Strict" )
                                                             .maxAge( 900 )
                                                             .path( "/" )
                                                             .build();
            
            ResponseCookie refreshTokenCookie = ResponseCookie.from( "refreshToken", authTokens.refreshToken() )
                                                              .httpOnly( true )
                                                              .secure( false ) /* in production environment make it true! important! */
                                                              .sameSite( "Strict" ) /* Only attach the cookie  */
                                                              .maxAge( 60 * 60 * 24 * 7 )
                                                              .path( "/" )
                                                              .build();
            
            return ResponseEntity.ok().header( HttpHeaders.SET_COOKIE, accessTokenCookie.toString() )
                                      .header( HttpHeaders.SET_COOKIE, refreshTokenCookie.toString() )
                                      .build();
        }
        
        catch ( AuthenticationFailedException exception )
        {
            return ResponseEntity.status( HttpStatus.UNAUTHORIZED ).build();
        }
    }
    
    @PostMapping( "/register" )
    public ResponseEntity<Void> registerUser( @RequestBody UserRegistrationDTO userRegistrationDTO )
    {
        //todo
        
        userRegistrationDTO.email();
        
        return ResponseEntity.ok().build();
    }
    
    @PostMapping( "/send-verification-code" )
    public ResponseEntity<?> verificationCode( @RequestBody SendVerificationCodeDTO sendVerificationCodeDTO )
    {
        try
        {
            authService.sendVerificationCode( sendVerificationCodeDTO.email() );
            
            return ResponseEntity.ok().build();
        }
        
        catch ( CodeRequestBlockedException codeRequestBlockedException )
        {
            return ResponseEntity.status( HttpStatus.TOO_MANY_REQUESTS ).body( codeRequestBlockedException.getMessage() );
        }
        
        catch ( UserAlreadyRegisteredException userAlreadyRegisteredException )
        {
            return ResponseEntity.status( HttpStatus.CONFLICT ).body( userAlreadyRegisteredException.getMessage() );
        }
    }
    
    @GetMapping( "/me" )
    public ResponseEntity<Void> me()
    {
        return ResponseEntity.ok().build();
    }
}