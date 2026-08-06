package com.fluxum.exception.authentication;

/**
 * 
 * @author Anderson Battisti
 */
public class UserNameNullOrEmptyException 
    extends
        RuntimeException
{
    public UserNameNullOrEmptyException( String message )
    {
        super( message );
    }
}
