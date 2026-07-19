package com.fluxum.exception.authentication;

/**
 * 
 * @author Anderson Battisti
 */
public class TokenNotValidException
    extends 
        RuntimeException
{
    public TokenNotValidException( String message )
    {
        super( message );
    }
}