package com.fluxum.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

import com.fluxum.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RefreshTokenService
{
    private final RefreshTokenRepository refreshTokenRepository;
    private final long refreshTokenExpirationMs;
    
    public RefreshTokenService( RefreshTokenRepository refreshTokenRepository, @Value( "${fluxum.jwt.access-token-expiration-ms}" ) long refreshTokenExpirationMs )
    {
        this.refreshTokenRepository = refreshTokenRepository;
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
}