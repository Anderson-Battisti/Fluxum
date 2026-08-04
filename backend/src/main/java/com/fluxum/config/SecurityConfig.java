package com.fluxum.config;

import java.util.List;

import com.fluxum.component.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

/**
 * 
 * @author Anderson Battisti
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig
{
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Value( "${fluxum.cors.allowed-origin}" )
    private String allowedOrigin;
    
    public SecurityConfig( JwtAuthenticationFilter jwtAuthenticationFilter )
    {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    
    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain( HttpSecurity httpSecurity ) throws Exception
    {
        return httpSecurity.cors( cors -> cors.configurationSource( request ->
                            {
                                CorsConfiguration config = new CorsConfiguration();
                                config.setAllowedOrigins( List.of( allowedOrigin ) );
                                config.setAllowedMethods( List.of( "GET", "POST", "PUT", "DELETE", "OPTIONS" ) );
                                config.setAllowedHeaders( List.of( "*" ) );
                                config.setAllowCredentials( true );
                                
                                return config;
                            } ) )
                           .csrf( AbstractHttpConfigurer::disable )
                           .sessionManagement( session -> session.sessionCreationPolicy( SessionCreationPolicy.STATELESS ) )
                           .authorizeHttpRequests( auth -> auth.requestMatchers( "/auth/authenticate", 
                                                                                 "/auth/refresh", 
                                                                                 "/auth/register", 
                                                                                 "/auth/send-verification-code", /* all requests except those specified here requires authentication */
                                                                                 "/check-verification-code",
                                                                                 "/error" ) /* It's a spring native route. Added here to avoid 403 forbidden when a not catched exception is thrown by my endpoints */
                                                               .permitAll()
                                                               .anyRequest()
                                                               .authenticated() )
                           .addFilterBefore( jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class )
                           .build();
    }
    
    @Bean
    public FilterRegistrationBean<JwtAuthenticationFilter> jwtFilterRegistration( JwtAuthenticationFilter jwtAuthenticationFilter )
    {
        FilterRegistrationBean<JwtAuthenticationFilter> registrationBean = new FilterRegistrationBean<>( jwtAuthenticationFilter );
        
        registrationBean.setEnabled( false );
        
        return registrationBean;
    }
}
