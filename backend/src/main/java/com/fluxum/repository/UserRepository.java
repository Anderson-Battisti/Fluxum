package com.fluxum.repository;

import java.util.Optional;

import jakarta.transaction.Transactional;

import com.fluxum.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * 
 * @author Anderson Battisti
 */
public interface UserRepository
    extends
        JpaRepository<User, Integer>
{
    Optional<User> findByEmail( String email );
    Optional<User> findByEmailAndEmailVerified( String email, boolean emailVerified );
    
    @Modifying
    @Transactional
    @Query( value = "update users set email_verified = true where email = :email", nativeQuery = true )
    int activateEmail( @Param( "email" ) String email );
}
