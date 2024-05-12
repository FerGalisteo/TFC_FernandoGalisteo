package com.dwes.security.controller;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.dwes.security.entities.PerfilProfesional;
import com.dwes.security.entities.Role;
import com.dwes.security.entities.Usuario;
import com.dwes.security.service.PerfilProfesionalService;
import com.google.gson.Gson;



@RestController
@RequestMapping("/api/v1/profesionales")
public class PerfilProfesionalController {
	@Autowired
	private PerfilProfesionalService perfilProfesionalService;
	
	@PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_USER')")
    public ResponseEntity<?> crearPerfil(@RequestPart("publicacion") String publicacion,
                                        @RequestParam(required = false) Map<String, MultipartFile> imagenes,
                                        @AuthenticationPrincipal Usuario usuario) {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
		PerfilProfesional perfil;
        try {
            perfil = new Gson().fromJson(publicacion, PerfilProfesional.class);
            return ResponseEntity.ok(perfilProfesionalService.crearPerfil(perfil, imagenes, username));
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        
	}
	
	
	
	
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
	public void deleteOfertaUser(@PathVariable Long id, @AuthenticationPrincipal Usuario usuario) {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = userDetails.getUsername();

		Set<Role> roles = usuario.getRoles();

		if (roles.contains(Role.ROLE_ADMIN)) {
			perfilProfesionalService.eliminarPerfilAdmin(id);
		} else {
			perfilProfesionalService.eliminarPerfil(id, username);
		}

	}
	

}
