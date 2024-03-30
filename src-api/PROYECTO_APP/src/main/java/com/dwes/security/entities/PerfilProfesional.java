package com.dwes.security.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table
public class PerfilProfesional {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(max = 100, message = "El título no puede tener más de 100 carácteres")
	private String titulo;

	@NotBlank
	@Size(max = 2000, message = "La descripción no puede tener más de 2000 carácteres")
	private String descripcion;

	@FutureOrPresent
	private LocalDate fechaDisponible;

	@ElementCollection
	private List<String> categorias = new ArrayList<>();

	@ElementCollection(targetClass = LugarDisponible.class)
	@Enumerated(EnumType.STRING)
	private List<LugarDisponible> lugaresDisponibles = new ArrayList<>();

	@ElementCollection
	private List<String> fotos = new ArrayList<>();

}
