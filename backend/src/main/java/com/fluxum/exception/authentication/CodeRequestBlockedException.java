package com.fluxum.exception.authentication;

/**
 * 
 * @author Anderson Battisti
 */
public class CodeRequestBlockedException
    extends
        RuntimeException
{
    public CodeRequestBlockedException( String message )
    {
        super( message );
    }
}