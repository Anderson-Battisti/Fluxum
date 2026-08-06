package com.fluxum.dto.auth;

/**
 * 
 * @author Anderson Battisti
 */
public record SendVerificationCodeDTO( String email, String password, String name ) {}