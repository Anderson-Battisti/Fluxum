package com.fluxum.exceptions;

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