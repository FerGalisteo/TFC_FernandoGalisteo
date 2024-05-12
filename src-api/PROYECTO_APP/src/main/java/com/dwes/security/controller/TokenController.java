package com.dwes.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dwes.security.entities.Usuario;
import com.dwes.security.service.UserService;

@Controller
@RequestMapping("/token")
public class TokenController {
	@Autowired
	UserService userService;
	
	@GetMapping
	public ResponseEntity<Usuario> recuperarUsuario(@AuthenticationPrincipal Usuario usuario){
		String mail = usuario.getEmail();
		Usuario user = userService.buscarByEmail(mail).orElse(null);
		System.out.println(user.getRoles());
		return ResponseEntity.ok(user);
	}

}
