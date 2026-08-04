package com.fluxum.exception.authentication;

/**
 * 
 * @author Anderson Battisti
 */
public class VerificationCodeExpiredException
    extends
        RuntimeException
{
    public VerificationCodeExpiredException( String message )
    {
        super( message );
    }
}
