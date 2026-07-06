package com.fluxum.repository;

import java.util.Optional;

import com.fluxum.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 
 * @author Anderson Battisti
 */
public interface UserRepository
    extends
        JpaRepository<User, Integer>
{
    Optional<User> findByEmail( String email );
}
