package com.fluxum.util.authentication;

import java.security.SecureRandom;

/**
 * 
 * @author Anderson Battisti
 */
public class VerificationCodeGenerator
{
    private static final String VERIFICATION_CODE_CHARACTERES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    private static final SecureRandom secureRandom = new SecureRandom();
    
    public static String generateVerificationCode()
    {
        StringBuilder stringBuilder = new StringBuilder();
        
        for ( int i = 0; i < 6; i++ )
        {
            stringBuilder.append( VERIFICATION_CODE_CHARACTERES.charAt( secureRandom.nextInt( VERIFICATION_CODE_CHARACTERES.length() ) ) );
        }
        
        return stringBuilder.toString();
    }
}