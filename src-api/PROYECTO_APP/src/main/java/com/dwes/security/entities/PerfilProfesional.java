package com.dwes.security.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table
@Data
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
	
	@OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuarioCreador;

	// TODO Arreglar tema fechas
	//@FutureOrPresent
	//private List<LocalDate> fechaDisponible = new ArrayList<>();

	@ElementCollection
	@Enumerated(EnumType.STRING)
	private List<Categorias> categorias = new ArrayList<>();

	@ElementCollection(targetClass = LugarDisponible.class)
	@Enumerated(EnumType.STRING)
	private List<LugarDisponible> lugaresDisponibles = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @ElementCollection(fetch = FetchType.LAZY, targetClass = Imagen.class)
	private List<Imagen> imagenes = new ArrayList<>();

}
