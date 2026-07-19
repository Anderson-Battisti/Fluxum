package com.fluxum.service;

import java.time.LocalDateTime;
import java.util.Optional;

import com.fluxum.dto.AuthTokensDTO;
import com.fluxum.exception.authentication.AuthenticationFailedException;
import com.fluxum.exception.authentication.CodeRequestBlockedException;
import com.fluxum.exception.authentication.UserAlreadyRegisteredException;
import com.fluxum.model.User;
import com.fluxum.model.VerificationCode;
import com.fluxum.repository.UserRepository;
import com.fluxum.repository.VerificationCodesRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 
 * @author Anderson Battisti
 */
@Service
public class AuthService
{
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;
    private final VerificationCodesRepository verificationCodesRepository;
    
    public AuthService( UserRepository userRepository, JwtService jwtService, RefreshTokenService refreshTokenService, PasswordEncoder passwordEncoder, VerificationCodesRepository verificationCodesRepository )
    {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.passwordEncoder = passwordEncoder;
        this.verificationCodesRepository = verificationCodesRepository;
    }
    
    public AuthTokensDTO authenticate( String email, String password ) throws AuthenticationFailedException
    {
        AuthenticationFailedException authenticationFailedException = new AuthenticationFailedException( "Authentication failed. Invalid credentials." );
        
        User user = userRepository.findByEmail( email ).orElseThrow( () -> authenticationFailedException );
        
        if ( !passwordEncoder.matches( password, user.getPassword() ) )
        {
            throw authenticationFailedException;
        }
        
        String accessToken = jwtService.generateAccessToken( user.getId() );
        String refreshToken = refreshTokenService.createRefreshToken( user );
        
        return new AuthTokensDTO( accessToken, refreshToken );
    }
    
    public void sendVerificationCode( String email )
    {
        if ( userRepository.findByEmail( email ).isPresent() )
        {
            throw new UserAlreadyRegisteredException( "This email is already registered in the database!" );
        }
        
        Optional<VerificationCode> verificationCode = verificationCodesRepository.findByEmail( email );
        
        if ( verificationCode.isPresent() && verificationCode.get().getExpiresAt().minusMinutes( 9 ).isAfter( LocalDateTime.now() ) )
        {
            throw new CodeRequestBlockedException( "Too many requests! Wait a minute to send another code!" );
        }
        
        // TODO send email
    }
}