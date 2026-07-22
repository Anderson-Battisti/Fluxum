package com.fluxum.service.auth;

import com.fluxum.interfaces.EmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;

public class SmtpEmailService
    implements
        EmailService
{
    private final JavaMailSender mailSender;
    
    public SmtpEmailService( JavaMailSender mailSender )
    {
        this.mailSender = mailSender;
    }
    
    @Override
    @Async( "emailExecutor" ) /* Must have the same name 'emailExecutor' as AsyncConfig @bean, so spring will know how to handle it */
    public void sendVerificationCode( String recipientEmail, String code )
    {
        SimpleMailMessage message = new SimpleMailMessage();
        
        message.setTo( recipientEmail );
        message.setSubject( "Your Fluxum Verification Code" );
        message.setText( "Your verification code is: " + code + "\nIt will expires in 10 minutes." );
        
        mailSender.send( message );
    }
}