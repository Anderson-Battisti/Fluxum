package com.fluxum.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

/**
 * 
 * @author Anderson Battisti
 */
@Entity
@Table( name = "verification_codes" )
public class VerificationCode
{
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;
    
    @NotNull
    @Column( nullable = false )
    private String email;
    
    @NotNull
    @Column( nullable = false )
    private String code;
    
    @NotNull
    @Column( name = "expires_at", nullable = false )
    private LocalDateTime expiresAt;
    
    public LocalDateTime getExpiresAt()
    {
        return this.expiresAt;
    }
}