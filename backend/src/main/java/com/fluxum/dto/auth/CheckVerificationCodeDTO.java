package com.fluxum.dto.auth;

/**
 * 
 * @author Anderson Battisti
 */
public record CheckVerificationCodeDTO( String email, String verificationCode, String name ) {}