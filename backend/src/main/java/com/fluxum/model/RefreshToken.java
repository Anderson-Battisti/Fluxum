package com.fluxum.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * 
 * @author Anderson Battisti
 */
@Entity
@Table( name = "refresh_tokens" )
public class RefreshToken
{
    public RefreshToken() {}
    
    public RefreshToken( User user, String tokenHash, LocalDateTime expiryDate )
    {
        this.user       = user;
        this.tokenHash  = tokenHash;
        this.expiryDate = expiryDate;
        this.revoked    = false;
    }
    
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;
    
    @ManyToOne( fetch = FetchType.LAZY )
    @JoinColumn( name = "user_id", nullable = false )
    private User user;
    
    @Column( name = "token_hash", nullable = false, unique = true )
    private String tokenHash;
    
    @Column( name = "expiry_date", nullable = false )
    private LocalDateTime expiryDate;
    
    @Column( nullable = false )
    private boolean revoked = false;
    
    public LocalDateTime getExpiryDate()
    {
        return expiryDate;
    }
    
    public boolean isRevoked()
    {
        return revoked;
    }
    
    public void setRevoked( boolean revoked )
    {
        this.revoked = revoked;
    }
}