package com.dwes.security.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dwes.security.entities.Categorias;
import com.dwes.security.entities.LugarDisponible;
import com.dwes.security.entities.Oferta;
import com.dwes.security.entities.PerfilProfesional;
import com.dwes.security.entities.Usuario;
import com.dwes.security.error.exception.OfertaNotFoundException;
import com.dwes.security.repository.OfertaRepository;
import com.dwes.security.repository.PerfilProfesionalRepository;
import com.dwes.security.repository.UserRepository;
import com.dwes.security.service.OfertaService;

@Service
public class OfertaServiceImpl implements OfertaService {

	@Autowired
	private OfertaRepository ofertaRepository;
	
	@Autowired
	private PerfilProfesionalRepository perfilRepository;



	@Autowired
	private UserRepository usuarioRepositorio;

	/**
	 * Método para guardar una oferta.
	 * Recibe la oferta a guardar y el usuario que la solicita.
	 * Comprueba que el usuario existe
	 * Asigna el usuario a la oferta
	 * Guarda la oferta
	 */
	public void guardarOferta(Oferta oferta, String username) {
		Usuario usuarioCreador = usuarioRepositorio.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + username));
		oferta.setUsuarioCreador(usuarioCreador);
		oferta.setFechaCreacion(LocalDate.now());
		ofertaRepository.save(oferta);
	}

	/**
	 * Método para comprobar si un usuario ha creado la oferta que se le pasa.
	 * @param usuarioId
	 * @param oferta
	 * @return
	 */
	boolean puedeCrearOferta(Long usuarioId, Oferta oferta) {
		// TODO Auto-generated method stub
		return oferta.getUsuarioCreador().getId().equals(usuarioId);
	}

	/**
	 * Método para listar todas las ofertas
	 */
	@Override
	public Page<Oferta> listarTodasLasOfertas(Pageable pageable) {
		return ofertaRepository.findAll(pageable);
	}

	/**
	 * Método para obtener una oferta por ID
	 */
	@Override
	public Oferta obtenerOfertaPorId(Long id) {
		return ofertaRepository.findById(id).orElseThrow(() -> new OfertaNotFoundException("Oferta no encontrada"));
	}

	/*
	 * Método que actualiza una oferta comprobando que el usuario ha creado esa oferta
	 * 
	 */

	@Override
	public Oferta actualizarOferta(Long id, Oferta oferta, String username) {
		Oferta offer = ofertaRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Oferta no encontrada"));

		// Verificar si el usuario tiene permisos para editar la oferta.
		if (!puedeEliminarOferta(username, offer)) {
			throw new AccessDeniedException("No tienes permisos para editar esta oferta");
		}

		Oferta ofertaNueva = obtenerOfertaPorId(id);
		ofertaNueva.setTitulo(oferta.getTitulo());
		ofertaNueva.setPrecio(oferta.getPrecio());
		ofertaNueva.setDescripcion(oferta.getDescripcion());
		ofertaNueva.setFechaComienzo(oferta.getFechaComienzo());
		ofertaNueva.setCategorias(oferta.getCategorias());
		ofertaNueva.setLugar(oferta.getLugar());
		return ofertaRepository.save(ofertaNueva);
	}

	
	/**
	 * Método que actualiza una oferta si se trata de un administrador
	 */
	@Override
	public Oferta actualizarOfertaAdmin(Long id, Oferta oferta) {

		Oferta ofertaNueva = obtenerOfertaPorId(id);
		ofertaNueva.setTitulo(oferta.getTitulo());
		ofertaNueva.setPrecio(oferta.getPrecio());
		ofertaNueva.setDescripcion(oferta.getDescripcion());
		ofertaNueva.setFechaComienzo(oferta.getFechaComienzo());
		ofertaNueva.setCategorias(oferta.getCategorias());
		ofertaNueva.setLugar(oferta.getLugar());
		return ofertaRepository.save(ofertaNueva);
	}

	/**
	 * Método que elimina una oferta si se es administrador
	 */
	@Override
	public void eliminarOfertaAdmin(Long id) {
		ofertaRepository.deleteById(id);

	}

	// Método para eliminar una oferta SI LA HA CREADO EL QUE ESTÁ LOGEADO
	@Override
	public void eliminarOferta(Long ofertaId, String username) {
		// Obtenemos la oferta por ID
		Oferta oferta = ofertaRepository.findById(ofertaId)
				.orElseThrow(() -> new IllegalArgumentException("Oferta no encontrada"));

		// Verificar si el usuario tiene permisos para eliminar la oferta.
		if (!puedeEliminarOferta(username, oferta)) {
			throw new AccessDeniedException("No tienes permisos para eliminar esta oferta");
		}

		ofertaRepository.deleteById(ofertaId);
	}

	/**
	 * Método para comprobar si el usuario logueado coincide con el que ha creado la
	 * publicación
	 * 
	 * @param username
	 * @param oferta
	 * @return
	 */
	private boolean puedeEliminarOferta(String username, Oferta oferta) {
		// Verifica si el usuario logueado coincide con el usuario que creó la oferta
		return oferta.getUsuarioCreador().getUsername().equals(username);
	}

	/**
	 * MÉTODO FILTRADO POR USUARIO
	 */
	@Override
	public Page<Oferta> listarOfertaPorUsuario(String username, Pageable pageable) {
		Usuario usuario = usuarioRepositorio.findByEmail(username).orElseThrow(
				() -> new UsernameNotFoundException("Usuario no encontrado con nombre de usuario: " + username));
		return ofertaRepository.findByUsuarioCreador(usuario, pageable);
	}

	/**
	 * FILTRADO POR PRECIO MAX
	 * 
	 * @param precioMax
	 * @param pageable
	 * @return
	 */
	public Page<Oferta> listarOfertasPorPrecioMaximo(Double precioMax, Pageable pageable) {
		if (precioMax != null) {
			return ofertaRepository.findByPrecioLessThanEqual(precioMax, pageable);
		} else {
			return ofertaRepository.findAll(pageable);
		}
	}
	
	
	
	@Override
	public void addCandidato(Long ofertaId, String email) throws Exception {
		
		Oferta oferta = ofertaRepository.findById(ofertaId)
                .orElseThrow(() -> new IllegalArgumentException("Oferta no encontrada con ID: " + ofertaId));
		Usuario usuario = usuarioRepositorio.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + email));
		
		PerfilProfesional perfil = perfilRepository.findByUsuarioCreador(usuario);
		
		if (oferta.getCandidatos() == null) {
			oferta.setCandidatos(new ArrayList<>());
		}
		
		if (oferta.getCandidatos().contains(perfil)) {
            throw new IllegalArgumentException("El usuario ya es candidato de esta oferta");
        }
		
		oferta.getCandidatos().add(perfil);
	        ofertaRepository.save(oferta);
		
	}
	
	@Override
	public void removeCandidato(Long ofertaId, String email) throws Exception {
		
		Oferta oferta = ofertaRepository.findById(ofertaId)
                .orElseThrow(() -> new IllegalArgumentException("Oferta no encontrada con ID: " + ofertaId));
		Usuario usuario = usuarioRepositorio.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + email));
		
		PerfilProfesional perfil = perfilRepository.findByUsuarioCreador(usuario);
		
		if (oferta.getCandidatos() == null) {
			oferta.setCandidatos(new ArrayList<>());
		}
		
		if (!oferta.getCandidatos().contains(perfil)) {
            throw new IllegalArgumentException("El usuario no es candidato de esta oferta");
        }
		
		oferta.getCandidatos().remove(perfil);
	        ofertaRepository.save(oferta);
		
	}
	
	public Page<Oferta> findByCategoriaAndLugar(Categorias categoria, LugarDisponible lugar, Pageable pageable) {
        return ofertaRepository.findByCategoriaAndLugar(categoria, lugar, pageable);
    }
	
	public List<Oferta> getAllOfertas() {
        return ofertaRepository.findAll();
    }
	
	public Page<Oferta> getOfertasByUsuario(Usuario usuario, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ofertaRepository.findByUsuarioCreador(usuario, pageable);
    }

}
