package com.fluxum.service.auth;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/** The application must have locally a file called application-local.properties containing the secret and the 
 *  token expiration time. application-local.properties MUST NOT BE VERSIONED!!! 
 *
 * @author Anderson Battisti
 */
@Service
public class JwtService
{
    private final SecretKey secretKey;
    private final long accessTokenExpirationMs;
    
    public JwtService( @Value( "${fluxum.jwt.secret}" ) String secret, @Value( "${fluxum.jwt.access-token-expiration-ms}" ) long accessTokenExpirationMs )
    {
        this.secretKey = Keys.hmacShaKeyFor( secret.getBytes( StandardCharsets.UTF_8 ) );
        this.accessTokenExpirationMs = accessTokenExpirationMs;
    }
    
    public String generateAccessToken( Long userId )
    {
        Date now = new Date();
        Date expirationDate = new Date( now.getTime() + accessTokenExpirationMs );
        
        return Jwts.builder()
                   .subject( String.valueOf( userId ) )
                   .issuedAt( now )
                   .expiration( expirationDate )
                   .signWith( secretKey )
                   .compact();
    }
    
    public boolean isTokenValid( String token )
    {
        try
        {
            parseClaims( token );
            
            return true;
        }
        
        catch ( Exception e )
        {
            return false;
        }
    }
    
    public Long extractUserId( String token )
    {
        return Long.valueOf( parseClaims( token ).getSubject() );
    }
    
    /** This method will check two things, if the token has the correct signature using the secretKey object and 
    *   if the token is still valid (not expired yet), if any of 'em fails, it will throw an Exception, if so, the token is not valid
    *   and the system must refuse the authentication **/
    private Claims parseClaims( String token )
    {
        return Jwts.parser()
                   .verifyWith( secretKey )
                   .build()
                   .parseSignedClaims( token )
                   .getPayload();
    }
}