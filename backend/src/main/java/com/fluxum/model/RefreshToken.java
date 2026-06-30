package com.fluxum.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class RefreshToken
{
    public RefreshToken() {}
    
    @Id
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
}
