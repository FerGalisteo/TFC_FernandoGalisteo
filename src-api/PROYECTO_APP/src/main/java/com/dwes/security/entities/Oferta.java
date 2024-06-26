package com.dwes.security.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

@Entity
@Table
public class Oferta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	@Size(max = 50, message = "Máximo de carácteres 50 en título")
	private String titulo;
	@Size(max = 200, message = "Máximo de carácteres 200 en descripción")
	private String descripcion;
	@NotBlank
	private Double precio;
	
	@ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuarioCreador;
	
	@ManyToMany
	@JoinTable(name = "oferta_candidato", joinColumns = @JoinColumn(name = "oferta_id", referencedColumnName="id"),
	inverseJoinColumns = @JoinColumn(name = "perfil_id", referencedColumnName="id"))
	private List<PerfilProfesional> candidatos;
	
	@PastOrPresent
    private LocalDate fechaCreacion;
    @FutureOrPresent
    private LocalDate fechaComienzo;
    @Enumerated(EnumType.STRING)
    private LugarDisponible lugar;
    
    @ElementCollection
	@Enumerated(EnumType.STRING)
	private List<Categorias> categorias = new ArrayList<>();
    
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public Double getPrecio() {
		return precio;
	}
	public void setPrecio(Double precio) {
		this.precio = precio;
	}
	public Usuario getUsuarioCreador() {
		return usuarioCreador;
	}
	public void setUsuarioCreador(Usuario usuarioCreador) {
		this.usuarioCreador = usuarioCreador;
	}
	public LocalDate getFechaCreacion() {
		return fechaCreacion;
	}
	public void setFechaCreacion(LocalDate fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	public LocalDate getFechaComienzo() {
		return fechaComienzo;
	}
	public void setFechaComienzo(LocalDate fechaComienzo) {
		this.fechaComienzo = fechaComienzo;
	}
	public LugarDisponible getLugar() {
		return lugar;
	}
	public void setLugar(LugarDisponible lugar) {
		this.lugar = lugar;
	}
	public List<Categorias> getCategorias() {
		return categorias;
	}
	public void setCategorias(List<Categorias> categorias) {
		this.categorias = categorias;
	}
	public List<PerfilProfesional> getCandidatos() {
		return candidatos;
	}
	public void setCandidatos(List<PerfilProfesional> candidatos) {
		this.candidatos = candidatos;
	}
    
    
}
