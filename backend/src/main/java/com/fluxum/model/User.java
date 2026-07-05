package com.fluxum.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import com.fluxum.model.enums.OnboardingStage;

/**
 * 
 * @author Anderson Battisti
 */
@Entity
public class User
{
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;
    
    @NotEmpty
    @Size( max = 100 )
    @Column( nullable = false, length = 100 )
    private String name;
    
    @NotEmpty
    @Size( max = 254 )
    @Column( nullable = false, length = 254, unique = true )
    private String email;
    
    @NotEmpty
    @Column( nullable = false, length = 255 )
    private String password;
    
    @Column( nullable = false )
    private Boolean active = true;
    
    @Column( nullable = false, updatable = false )
    private LocalDateTime createdAt;
    
    @Column( nullable = false )
    private LocalDateTime updatedAt;
    
    @Column( nullable = false )
    private OnboardingStage onboardingStage = OnboardingStage.NOT_STARTED;
}