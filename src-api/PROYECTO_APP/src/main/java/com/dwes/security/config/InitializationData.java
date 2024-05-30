package com.dwes.security.config;

import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.dwes.security.entities.Role;
import com.dwes.security.entities.Usuario;
import com.dwes.security.repository.UserRepository;

import jakarta.transaction.Transactional;

@Profile("demo")
@Component
public class InitializationData implements CommandLineRunner {

	 Logger logger = LoggerFactory.getLogger(InitializationData.class);

    @Autowired
    private UserRepository usuarioRepository;
 
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
    	
    	if(Objects.equals(usuarioRepository.findByEmail("admin@example.com"), null)) {
    		Usuario usuario4 = new Usuario();
            usuario4.setFirstName("Admin");
            usuario4.setLastName("Administrador");
            usuario4.setEmail("admin@example.com");
            usuario4.setPassword(passwordEncoder.encode("password1234"));
            usuario4.getRoles().add(Role.ROLE_ADMIN);
            usuarioRepository.save(usuario4);
    	}
    	if(usuarioRepository.findByEmail("alice.johnson@example.com") == null) {
    		Usuario usuario1 = new Usuario();
            usuario1.setFirstName("Alice");
            usuario1.setLastName("Johnson");
            usuario1.setEmail("alice.johnson@example.com");
            usuario1.setPassword(passwordEncoder.encode("password123"));
            usuario1.getRoles().add(Role.ROLE_USER);
            usuarioRepository.save(usuario1);
    	}
    	if(usuarioRepository.findByEmail("bob.smith@example.com") == null) {
    		Usuario usuario2 = new Usuario();
            usuario2.setFirstName("Bob");
            usuario2.setLastName("Smith");
            usuario2.setEmail("bob.smith@example.com");
            usuario2.setPassword(passwordEncoder.encode("password456"));
            usuario2.getRoles().add(Role.ROLE_ADMIN);
            usuarioRepository.save(usuario2);
    	}
    	if(usuarioRepository.findByEmail("carol.davis@example.com") == null) {
    		Usuario usuario3 = new Usuario();
            usuario3.setFirstName("Carol");
            usuario3.setLastName("Davis");
            usuario3.setEmail("carol.davis@example.com");
            usuario3.setPassword(passwordEncoder.encode("password789"));
            usuario3.getRoles().add(Role.ROLE_USER);
            usuarioRepository.save(usuario3);
    	}
    	
    	
        
    }
}