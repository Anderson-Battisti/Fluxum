package com.fluxum.exception.authentication;

/**
 * 
 * @author Anderson Battisti
 */
public class UserEmailNotVerifiedException
    extends
        RuntimeException
{
    public UserEmailNotVerifiedException( String message )
    {
        super( message );
    }
}
