package com.fluxum.controller;

import com.fluxum.dto.AuthBodyDTO;
import com.fluxum.dto.AuthTokensDTO;
import com.fluxum.service.AuthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
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
                                                          .sameSite( "Strict" )
                                                          .maxAge( 60 * 60 * 24 * 7 )
                                                          .path( "/" )
                                                          .build();
        
        return ResponseEntity.ok().header( HttpHeaders.SET_COOKIE, accessTokenCookie.toString() )
                                  .header( HttpHeaders.SET_COOKIE, refreshTokenCookie.toString() )
                                  .build();
    }
}