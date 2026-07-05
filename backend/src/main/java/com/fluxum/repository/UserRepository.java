package com.fluxum.repository;

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
}
