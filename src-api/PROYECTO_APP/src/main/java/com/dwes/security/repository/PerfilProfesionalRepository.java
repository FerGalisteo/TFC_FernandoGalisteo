package com.dwes.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dwes.security.entities.PerfilProfesional;
import com.dwes.security.entities.Usuario;

public interface PerfilProfesionalRepository extends JpaRepository<PerfilProfesional, Long>{


	PerfilProfesional findByUsuarioCreador(Usuario usuario);
	

}
