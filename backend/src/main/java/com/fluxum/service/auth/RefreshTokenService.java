package com.fluxum.service.auth;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

import com.fluxum.exception.authentication.RefreshTokenNotFoundException;
import com.fluxum.exception.authentication.TokenNotValidException;
import com.fluxum.model.RefreshToken;
import com.fluxum.model.User;
import com.fluxum.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * 
 * @author Anderson Battisti
 */
@Service
public class RefreshTokenService 
{
    private final RefreshTokenRepository refreshTokenRepository;
    private final long refreshTokenExpirationMs;
    
    public RefreshTokenService( RefreshTokenRepository refreshTokenRepository, @Value( "${fluxum.jwt.refresh-token-expiration-ms}" ) long refreshTokenExpirationMs )
    {
        this.refreshTokenRepository   = refreshTokenRepository;
        this.refreshTokenExpirationMs = refreshTokenExpirationMs;
    }
    
    private String getHashToken( String rawToken )
    {
        try
        {
            MessageDigest messageDigest = MessageDigest.getInstance( "SHA-256" );
            
            byte[] hashBytes = messageDigest.digest( rawToken.getBytes( StandardCharsets.UTF_8 ) );
            
            return Base64.getEncoder().encodeToString( hashBytes );
        }

        catch ( Exception exception )
        {
            throw new RuntimeException( "SHA-256 not available", exception );
        }
    }
    
    public String createRefreshToken( User user )
    {
        byte[] randomBytes = new byte[ 64 ];
        
        new SecureRandom().nextBytes( randomBytes );
        
        String rawToken = Base64.getUrlEncoder().encodeToString( randomBytes );
        
        String hashToken = getHashToken( rawToken );
        
        RefreshToken refreshToken = new RefreshToken( user, hashToken, LocalDateTime.now().plusSeconds( refreshTokenExpirationMs / 1000 ) );
        
        refreshTokenRepository.save( refreshToken );
        
        return rawToken;
    }
    
    public RefreshToken validateRefreshToken( String rawToken )
    {
        RefreshToken refreshToken = refreshTokenRepository.findByTokenHash( getHashToken( rawToken ) )
                                                          .orElseThrow( () -> new TokenNotValidException( "Token not found on database!" ) );
        
        if ( refreshToken.isRevoked() || refreshToken.getExpiryDate().isBefore( LocalDateTime.now() ) )
        {
            throw new TokenNotValidException( "This token is not valid anymore!" );
        }
        
        return refreshToken;
    }
    
    public void revokeRefreshToken( String rawToken )
    {
        RefreshToken updatedRefreshToken = refreshTokenRepository.findByTokenHash( getHashToken( rawToken ) )
                                                                 .orElseThrow( () -> new RefreshTokenNotFoundException( "Refresh token not found on database" ) );
        
        updatedRefreshToken.setRevoked( true );
        
        refreshTokenRepository.save( updatedRefreshToken ) ;
    }
}