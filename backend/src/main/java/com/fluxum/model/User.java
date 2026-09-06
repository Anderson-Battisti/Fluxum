package com.fluxum.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import com.fluxum.model.enums.OnboardingStage;

/**
 * 
 * @author Anderson Battisti
 */
@Entity
@Table( name = "users" )
public class User
{
    public User() {}
    public User( String email, String encryptedPassword, String name )
    {
        this.email = email;
        this.password = encryptedPassword;
        this.name = name;
        this.emailVerified = false;
    }
    
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;
    
    @NotEmpty
    @Size( max = 100 )
    @Column( nullable = false, length = 100 )
    private String name;
    
    @NotEmpty
    @Size( max = 254 )
    @Column( length = 254, unique = true )
    private String email;
    
    @NotEmpty
    @Column( nullable = false, length = 255 )
    private String password;
    
    @Column( nullable = false, insertable = false )
    private Boolean active = true;
    
    @Column( insertable = false, updatable = false )
    private LocalDateTime createdAt;
    
    @Column( insertable = false, updatable = false )
    private LocalDateTime updatedAt;
    
    @Column( insertable = false )
    private OnboardingStage onboardingStage = OnboardingStage.NOT_STARTED;
    
    @Column( insertable = false )
    private Boolean emailVerified;
    
    public Long getId()
    {
        return id;
    }
    
    public String getPassword()
    {
        return password;
    }
    
    public OnboardingStage getOnboardingStage()
    {
        return onboardingStage;
    }
    
    public Boolean isEmailVerified()
    {
        return emailVerified;
    }
}