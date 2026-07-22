package com.fluxum.interfaces;

/**
 * 
 * @author Anderson Battisti
 */
public interface EmailService
{
    void sendVerificationCode( String recipientEmail, String code );
}