package com.fluxum.repository;

import java.util.Optional;

import com.fluxum.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository
    extends
        JpaRepository<RefreshToken, Integer>
{
    Optional<RefreshToken> findByTokenHash( String tokenHash );
}
