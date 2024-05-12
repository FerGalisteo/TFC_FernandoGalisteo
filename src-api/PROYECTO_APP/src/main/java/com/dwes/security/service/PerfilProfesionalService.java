package com.dwes.security.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.dwes.security.entities.PerfilProfesional;
import com.dwes.security.entities.Usuario;

public interface PerfilProfesionalService {

	PerfilProfesional crearPerfil(PerfilProfesional perfil, Map<String, MultipartFile> imagenes, String usuario) throws IOException;

	void eliminarPerfilAdmin(Long id);

	void eliminarPerfil(Long id, String username);

}