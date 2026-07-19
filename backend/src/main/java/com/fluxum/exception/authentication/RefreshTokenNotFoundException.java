package com.fluxum.exception.authentication;

/**
 * 
 * @author Anderson Battisti
 */
public class RefreshTokenNotFoundException
    extends 
        RuntimeException
{
    public RefreshTokenNotFoundException( String message )
    {
        super( message );
    }
}