package com.dwes.security.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
public class Usuario implements UserDetails {
	  private static final long serialVersionUID = 1L;
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @NotBlank(message = "El nombre es obligatorio")
	    private String firstName;

	    @NotBlank(message = "El apellido es obligatorio")
	    private String lastName;

	    @Column(unique = true)
	    @Email(message = "El email debe ser válido")
	    @NotBlank(message = "El email es obligatorio")
	    private String email;

	    @NotBlank(message = "La contraseña es obligatoria")
	    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
	    private String password;

	    @ElementCollection(fetch = FetchType.EAGER, targetClass = Role.class)
	    @Enumerated(EnumType.STRING)
	    @CollectionTable(name="usuario_rol")
	    @Column(name ="RolesUsuario")
	    private Set<Role> roles = new HashSet<>();

	    @OneToMany(mappedBy = "usuarioCreador", cascade = CascadeType.REMOVE, orphanRemoval = true)
	    private List<Oferta> ofertas = new ArrayList<>();

	    @OneToOne(mappedBy = "usuarioCreador", cascade = CascadeType.REMOVE, orphanRemoval = true)
	    private PerfilProfesional perfilProfesional;

	    @Transactional
	    @Override
	    public Collection<? extends GrantedAuthority> getAuthorities() {
	        // Cargar la colección de roles de manera temprana
	        roles.size(); // Esto carga la colección de roles

	        return roles.stream()
	                .map(role -> new SimpleGrantedAuthority(role.name()))
	                .collect(Collectors.toList());
	    }
	    @Override
	    public String getUsername() {
	        return email;
	    }

	    @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }

	    @Override
	    public String getPassword() {
	        return password;
	    }

	    // Métodos setter añadidos
	    public void setFirstName(String firstName) {
	        this.firstName = firstName;
	    }

	    public void setLastName(String lastName) {
	        this.lastName = lastName;
	    }

	    public void setEmail(String email) {
	        this.email = email;
	    }

	    public void setPassword(String password) {
	        this.password = password;
	    }

	    public Set<Role> getRoles() {
	        return roles;
	    }

	    public void setRoles(Set<Role> roles) {
	        this.roles = roles;
	    }
		public Long getId() {
			return id;
		}
		public String getFirstName() {
			return firstName;
		}
		public String getLastName() {
			return lastName;
		}
		public String getEmail() {
			return email;
		}
	    
	    
}
