package com.fluxum.exception.authentication;

/**
 * 
 * @author Anderson Battisti
 */
public class InvalidVerificationCodeException
    extends
        RuntimeException
{
    public InvalidVerificationCodeException( String message )
    {
        super( message );
    }
}