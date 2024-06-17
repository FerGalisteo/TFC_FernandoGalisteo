package com.dwes.security.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.dwes.security.adapter.GsonProvider;
import com.dwes.security.entities.Oferta;
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

	private final Gson gson = GsonProvider.createGson();
	
	@PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_USER')")
    public ResponseEntity<?> crearPerfil(@RequestPart("publicacion") String publicacion,
                                         @RequestParam(required = false) Map<String, MultipartFile> imagenes,
                                         @AuthenticationPrincipal Usuario usuario) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        PerfilProfesional perfil;
        try {
            perfil = gson.fromJson(publicacion, PerfilProfesional.class);
            return ResponseEntity.ok(perfilProfesionalService.crearPerfil(perfil, imagenes, username));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
	public void deletePerfil(@PathVariable Long id, @AuthenticationPrincipal Usuario usuario) {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = userDetails.getUsername();
		Set<Role> roles = usuario.getRoles();

		if (roles.contains(Role.ROLE_ADMIN)) {
			perfilProfesionalService.eliminarPerfilAdmin(id);
		} else {
			perfilProfesionalService.eliminarPerfil(id, username);
		}
	}

	@GetMapping
    public ResponseEntity<Page<PerfilProfesional>> listarTodosLosPerfiles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PerfilProfesional> perfiles = perfilProfesionalService.listarTodosLosPerfiles(pageable);
        return ResponseEntity.ok(perfiles);
    }
	
	@GetMapping("/all")
    public ResponseEntity<List<PerfilProfesional>> getAllPerfiles() {
        List<PerfilProfesional> perfiles = perfilProfesionalService.getAllPerfiles();
        return ResponseEntity.ok(perfiles);
    }
	
	@GetMapping("/mi-perfil")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<PerfilProfesional> getMiPerfil(@AuthenticationPrincipal Usuario usuario) {
        PerfilProfesional perfil = perfilProfesionalService.findByUsuarioCreador(usuario);
        if (perfil != null) {
            return new ResponseEntity<>(perfil, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

/*
	@GetMapping("/usuario/{id}")
	@PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<PerfilProfesional>> listarPerfilesPorUsuario(@PathVariable Long id) {
		return ResponseEntity.ok(perfilProfesionalService.listarPerfilesPorUsuario(id));
	}
	*/
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
	public ResponseEntity<PerfilProfesional> listarPerfilPorId(@PathVariable Long id) {
		return ResponseEntity.ok(perfilProfesionalService.listarPerfilPorId(id));
	}

	@PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> actualizarPerfil(@PathVariable Long id, @RequestPart("publicacion") String publicacion,
                                              @RequestParam(required = false) Map<String, MultipartFile> imagenes,
                                              @AuthenticationPrincipal Usuario usuario) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        PerfilProfesional perfilActualizado;
        Set<Role> roles = usuario.getRoles();
        
        if(roles.contains(Role.ROLE_ADMIN)) {
        	try {
                perfilActualizado = gson.fromJson(publicacion, PerfilProfesional.class);
                return ResponseEntity.ok(perfilProfesionalService.actualizarPerfilAdmin(id, perfilActualizado, imagenes, username));
            } catch (IOException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }else {
        	try {
            perfilActualizado = gson.fromJson(publicacion, PerfilProfesional.class);
            return ResponseEntity.ok(perfilProfesionalService.actualizarPerfil(id, perfilActualizado, imagenes, username));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        }
        
    }
}
