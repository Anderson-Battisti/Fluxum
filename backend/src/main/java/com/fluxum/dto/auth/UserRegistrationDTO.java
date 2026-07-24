package com.fluxum.dto.auth;

/**
 * 
 * @author Anderson Battisti
 */
public record UserRegistrationDTO( String email, String password, String verificationCode ) {}