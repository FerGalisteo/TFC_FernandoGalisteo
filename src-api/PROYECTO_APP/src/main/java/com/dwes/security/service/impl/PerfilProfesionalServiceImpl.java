package com.dwes.security.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dwes.security.entities.Imagen;
import com.dwes.security.entities.Oferta;
import com.dwes.security.entities.PerfilProfesional;
import com.dwes.security.entities.Usuario;
import com.dwes.security.repository.ImagenRepository;
import com.dwes.security.repository.PerfilProfesionalRepository;
import com.dwes.security.repository.UserRepository;
import com.dwes.security.service.PerfilProfesionalService;

@Service
public class PerfilProfesionalServiceImpl implements PerfilProfesionalService{
	
	@Autowired
	private ImagenRepository imagenRepository;
	@Autowired
	private PerfilProfesionalRepository perfilRepository;
	@Autowired
	private UserRepository usuarioRepositorio;
	
	

	@Override
	public PerfilProfesional crearPerfil(PerfilProfesional perfil, Map<String, MultipartFile> imagenes,
			String usuario) throws IOException {
		
		//Guardar imagenes
		
		List<Imagen> listImagenes = new ArrayList<>();
       
        if (imagenes != null) {
            for (Map.Entry<String, MultipartFile> entry : imagenes.entrySet()) {
                MultipartFile imagen = entry.getValue();
                Imagen img = new Imagen(imagen.getOriginalFilename(), imagen.getContentType(), imagen.getBytes());
                imagenRepository.save(img);
                listImagenes.add(img);
            }
            perfil.setImagenes(listImagenes);
        }
        Usuario usuarioCreador = usuarioRepositorio.findByEmail(usuario)
				.orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + usuario));
        
		perfil.setUsuarioCreador(usuarioCreador);
        
        
		return perfilRepository.save(perfil);
	}



	@Override
	public void eliminarPerfilAdmin(Long id) {
		perfilRepository.deleteById(id);
		
	}



	@Override
	public void eliminarPerfil(Long id, String username) {
		PerfilProfesional perfil = perfilRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Perfil no encontrado"));
		
		if (!puedeEliminarPerfil(username, perfil)) {
			throw new AccessDeniedException("No tienes permisos para eliminar este perfil");
		}
		
	}
	
	private boolean puedeEliminarPerfil(String username, PerfilProfesional perfil) {
		// Verifica si el usuario logueado coincide con el usuario que creó el perfil
		return perfil.getUsuarioCreador().getUsername().equals(username);
	}

}
