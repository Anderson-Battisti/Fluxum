package com.fluxum.service;

import com.fluxum.dto.AuthTokensDTO;
import com.fluxum.exception.AuthenticationFailedException;
import com.fluxum.model.User;
import com.fluxum.repository.UserRepository;
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
    
    public AuthService( UserRepository userRepository, JwtService jwtService, RefreshTokenService refreshTokenService, PasswordEncoder passwordEncoder )
    {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.passwordEncoder = passwordEncoder;
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
}