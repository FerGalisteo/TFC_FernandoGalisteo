package com.dwes.security.controller;

import java.io.IOException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.dwes.security.entities.PerfilProfesional;
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
        PerfilProfesional perfil;
        try {
            perfil = new Gson().fromJson(publicacion, PerfilProfesional.class);
            return ResponseEntity.ok(perfilProfesionalService.crearPerfil(perfil, imagenes, usuario));
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
	}
	

}
