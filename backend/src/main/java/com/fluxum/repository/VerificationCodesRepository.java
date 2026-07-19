package com.fluxum.repository;

import java.util.Optional;

import com.fluxum.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 
 * @author Anderson Battisti
 */
public interface VerificationCodesRepository
    extends
        JpaRepository<VerificationCode, Integer>
{
    Optional<VerificationCode> findByEmail( String email );
}
