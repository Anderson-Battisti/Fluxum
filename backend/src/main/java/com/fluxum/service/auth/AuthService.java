package com.fluxum.service.auth;

import java.time.LocalDateTime;
import java.util.Optional;

import com.fluxum.dto.auth.AuthTokensDTO;
import com.fluxum.exception.authentication.AuthenticationFailedException;
import com.fluxum.exception.authentication.CodeRequestBlockedException;
import com.fluxum.exception.authentication.InvalidVerificationCodeException;
import com.fluxum.exception.authentication.PasswordNotValidException;
import com.fluxum.exception.authentication.UserAlreadyRegisteredException;
import com.fluxum.exception.authentication.UserEmailNotVerifiedException;
import com.fluxum.exception.authentication.UserNameNullOrEmptyException;
import com.fluxum.exception.authentication.VerificationCodeExpiredException;
import com.fluxum.exception.authentication.VerificationCodeNotFoundException;
import com.fluxum.interfaces.EmailService;
import com.fluxum.model.User;
import com.fluxum.model.VerificationCode;
import com.fluxum.repository.UserRepository;
import com.fluxum.repository.VerificationCodesRepository;
import com.fluxum.util.authentication.VerificationCodeGenerator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 
 * @author Anderson Battisti
 */
@Service
public class AuthService
{
    private final UserRepository              userRepository;
    private final JwtService                  jwtService;
    private final RefreshTokenService         refreshTokenService;
    private final PasswordEncoder             passwordEncoder;
    private final VerificationCodesRepository verificationCodesRepository;
    private final EmailService                emailService;
    
    public AuthService( UserRepository userRepository, JwtService jwtService, RefreshTokenService refreshTokenService, PasswordEncoder passwordEncoder, VerificationCodesRepository verificationCodesRepository, EmailService emailService )
    {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.passwordEncoder = passwordEncoder;
        this.verificationCodesRepository = verificationCodesRepository;
        this.emailService = emailService;
    }
    
    public AuthTokensDTO authenticate( String email, String password ) throws AuthenticationFailedException, UserEmailNotVerifiedException
    {
        AuthenticationFailedException authenticationFailedException = new AuthenticationFailedException( "Authentication failed. Invalid credentials." );
        
        User user = userRepository.findByEmail( email )
                                  .orElseThrow( () -> authenticationFailedException );
        
        if ( !passwordEncoder.matches( password, user.getPassword() ) )
        {
            throw authenticationFailedException;
        }
        
        if ( !user.isEmailVerified() )
        {
            throw new UserEmailNotVerifiedException( "Authentication failed. User email not verified yet." );
        }
        
        String accessToken  = jwtService.generateAccessToken( user.getId() );
        String refreshToken = refreshTokenService.createRefreshToken( user );
        
        return new AuthTokensDTO( accessToken, refreshToken );
    }
    
    @Transactional
    public void sendVerificationCode( String email, String password, String name )
    {
        if ( userRepository.findByEmailAndEmailVerified( email, true ).isPresent() )
        {
            throw new UserAlreadyRegisteredException( "This email is already registered in the database!" );
        }
        
        Optional<User> user = userRepository.findByEmail( email );
             
        if ( user.isEmpty() && name == null || name.isEmpty() )
        {
            throw new UserNameNullOrEmptyException( "The username cannot be null or empty!" );
        }
        
        if ( user.isEmpty() && password == null || password.length() < 8 || password.length() > 128 )
        {
            throw new PasswordNotValidException( "The password provided must not be empty and must be between 8 and 128 characters " );
        }
        
        Optional<VerificationCode> verificationCode = verificationCodesRepository.findByEmail( email );
        
        if ( verificationCode.isPresent() && verificationCode.get()
                                                             .getExpiresAt()
                                                             .minusMinutes( 9 )
                                                             .isAfter( LocalDateTime.now() ) )
        {
            throw new CodeRequestBlockedException( "Too many requests! Wait a minute to send another code!" );
        }
        
        String code = VerificationCodeGenerator.generateVerificationCode();
        
        if ( verificationCode.isPresent() )
        {
            VerificationCode updatedVerificationCode = verificationCode.get();
            
            updatedVerificationCode.setCode( code );
            updatedVerificationCode.setExpiresAt( LocalDateTime.now().plusMinutes( 10 ) );
            
            verificationCodesRepository.save( updatedVerificationCode );
        }
        
        else
        {
            verificationCodesRepository.save( new VerificationCode( email, code, LocalDateTime.now().plusMinutes( 10 ) ) );
        }
        
        if ( userRepository.findByEmail( email ).isEmpty() )
        {
            userRepository.save( new User( email, passwordEncoder.encode( password ), name ) );
        }
        
        emailService.sendVerificationCode( email, code );
    }
    
    @Transactional
    public void checkVerificationCode( String email, String verificationCode )
    {
        VerificationCode fetchedVerificationCodeObject = verificationCodesRepository.findByEmail( email )
                                                                                    .orElseThrow( () -> new VerificationCodeNotFoundException( "No VerificationCode found for this email: " + email ) );
        
        if ( fetchedVerificationCodeObject.getExpiresAt().isBefore( LocalDateTime.now() ) )
        {
            throw new VerificationCodeExpiredException( "The provided code has already expired!" );
        }
        
        else if ( !fetchedVerificationCodeObject.getCode().equalsIgnoreCase( verificationCode ) )
        {
            throw new InvalidVerificationCodeException( "The provided verification code doesn't match with the database register!" );
        }
        
        userRepository.activateEmail( email );
        verificationCodesRepository.deleteByEmail( email );
    }
}