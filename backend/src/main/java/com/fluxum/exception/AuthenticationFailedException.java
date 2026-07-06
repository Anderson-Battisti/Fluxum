package com.fluxum.exception;

/**
 * 
 * @author Anderson Battisti
 */
public class AuthenticationFailedException
    extends 
        RuntimeException
{
    public AuthenticationFailedException( String message )
    {
        super( message );
    }
}