package com.dwes.security.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.dwes.security.dto.response.user.UsuarioResponse;
import com.dwes.security.entities.Usuario;

public interface UserService {
    UserDetailsService userDetailsService();
    List<UsuarioResponse> getAllUsers();
    Optional<Usuario> buscarByEmail(String username);
    void deleteUser(String email);
}
