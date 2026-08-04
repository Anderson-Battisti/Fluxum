package com.fluxum.exception.authentication;

/**
 * 
 * @author Anderson Battisti
 */
public class VerificationCodeNotFoundException
    extends
        RuntimeException
{
    public VerificationCodeNotFoundException( String message )
    {
        super( message );
    }
}
