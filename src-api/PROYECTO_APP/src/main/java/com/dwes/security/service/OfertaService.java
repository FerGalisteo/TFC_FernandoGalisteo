package com.dwes.security.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dwes.security.entities.Categorias;
import com.dwes.security.entities.LugarDisponible;
import com.dwes.security.entities.Oferta;
import com.dwes.security.entities.Usuario;

public interface OfertaService {


	Page<Oferta> listarTodasLasOfertas(Pageable pageable);

	Oferta obtenerOfertaPorId(Long id);

	Oferta actualizarOferta(Long id, Oferta oferta, String username);
	Oferta actualizarOfertaAdmin(Long id, Oferta oferta);

	Page<Oferta> listarOfertaPorUsuario(String username, Pageable pageable);

	//Reserva reservarOferta(Oferta oferta, Usuario usuario);

	void eliminarOfertaAdmin(Long id);

	void eliminarOferta(Long ofertaId, String username);

	// Oferta crearOferta(Long ofertaId, String titulo, Long usuarioId, String
	// descripcion, Double precio,LocalDate fechaCreacion, LocalDate fechaComienzo,
	// LugarDisponible lugar);

	void guardarOferta(Oferta oferta, String username);
	public Page<Oferta> listarOfertasPorPrecioMaximo(Double precioMax, Pageable pageable);

	void addCandidato(Long ofertaId, String username) throws Exception;

	void removeCandidato(Long ofertaId, String email) throws Exception;

	Page<Oferta> findByCategoriaAndLugar(Categorias categoria, LugarDisponible lugar, Pageable pageable);

	List<Oferta> getAllOfertas();

	Page<Oferta> getOfertasByUsuario(Usuario usuario, int page, int size);

}