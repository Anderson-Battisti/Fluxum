package com.fluxum.exception.authentication;

/**
 * 
 * @author Anderson Battisti
 */
public class UserAlreadyRegisteredException
    extends
        RuntimeException
{
    public UserAlreadyRegisteredException( String message )
    {
        super( message );
    }
}