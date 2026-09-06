package com.fluxum.dto.auth;

import com.fluxum.model.enums.OnboardingStage;

/**
 * 
 * @author Anderson Battisti
 */
public record LoginResponseDTO( String accessToken, String refreshToken, OnboardingStage onboardingStage ) {}