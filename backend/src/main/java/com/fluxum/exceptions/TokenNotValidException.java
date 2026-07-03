package com.fluxum.exceptions;

/** @author: Anderson Battisti **/
public class TokenNotValidException
    extends 
        RuntimeException
{
    public TokenNotValidException( String message )
    {
        super( message );
    }
}
