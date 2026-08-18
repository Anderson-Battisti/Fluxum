package com.fluxum.exception.authentication;

/**
 * 
 * @author Anderson Battisti
 */
public class PasswordNotValidException
    extends
        RuntimeException
{
    public PasswordNotValidException( String message )
    {
        super( message );
    }
}
