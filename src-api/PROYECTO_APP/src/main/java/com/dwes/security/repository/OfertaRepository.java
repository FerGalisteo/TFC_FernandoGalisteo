package com.dwes.security.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dwes.security.entities.Categorias;
import com.dwes.security.entities.LugarDisponible;
import com.dwes.security.entities.Oferta;
import com.dwes.security.entities.PerfilProfesional;
import com.dwes.security.entities.Usuario;
@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Long> {
	
	Page<Oferta> findByUsuarioCreador(Usuario usuario, Pageable pageable);
	Page<Oferta> findByPrecioLessThanEqual(Double precioMax, Pageable pageable);
	
	@Query("SELECT o FROM Oferta o WHERE (:categoria IS NULL OR :categoria MEMBER OF o.categorias) AND (:lugar IS NULL OR o.lugar = :lugar)")
    Page<Oferta> findByCategoriaAndLugar(@Param("categoria") Categorias categoria, @Param("lugar") LugarDisponible lugar, Pageable pageable);

}
