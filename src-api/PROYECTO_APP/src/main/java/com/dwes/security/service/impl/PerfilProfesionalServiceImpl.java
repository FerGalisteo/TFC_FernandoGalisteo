package com.dwes.security.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dwes.security.entities.Imagen;
import com.dwes.security.entities.PerfilProfesional;
import com.dwes.security.entities.Usuario;
import com.dwes.security.repository.ImagenRepository;
import com.dwes.security.repository.PerfilProfesionalRepository;
import com.dwes.security.service.PerfilProfesionalService;

@Service
public class PerfilProfesionalServiceImpl implements PerfilProfesionalService{
	
	@Autowired
	private ImagenRepository imagenRepository;
	@Autowired
	private PerfilProfesionalRepository perfilRepository;
	
	

	@Override
	public PerfilProfesional crearPerfil(PerfilProfesional perfil, Map<String, MultipartFile> imagenes,
			Usuario usuario) throws IOException {
		
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
        
        
        
		return perfilRepository.save(perfil);
	}

}
