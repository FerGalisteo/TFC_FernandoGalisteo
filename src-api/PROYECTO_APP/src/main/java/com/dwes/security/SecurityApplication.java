package com.dwes.security;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableJpaRepositories
public class SecurityApplication {

	public static void main(String[] args) {
		
		 if (System.getenv("AWS_EXECUTION_ENV") == null) {
	            int maxDepth = 5;
	            Optional<Path> envPathOptional = findEnvFile(Paths.get("").toAbsolutePath(), maxDepth);
	            if (envPathOptional.isPresent()) {
	                Path envPath = envPathOptional.get();
	                Dotenv dotenv = Dotenv.configure().directory(envPath.getParent().toString()).load();
	                dotenv.entries().forEach(entry -> {
	                    System.setProperty(entry.getKey(), entry.getValue());
	                });
	            } else {
	                System.out.println(".env file not found!");
	            }
	        }
		
		
		SpringApplication.run(SecurityApplication.class, args);
		
		
	}

	private static Optional<Path> findEnvFile(Path startPath, int maxDepth) {
        Path currentPath = startPath;
        int depth = 0;
        while (currentPath != null && depth <= maxDepth) {
            Path envFile = currentPath.resolve(".env");
            if (Files.exists(envFile)) {
                return Optional.of(envFile);
            }
            currentPath = currentPath.getParent();
            depth++;
        }
        return Optional.empty();
    }
}
/**
 * Generación de una clave secreta segura para JWT.
 *
 * Para garantizar la seguridad en la firma de tokens JWT, es esencial utilizar una clave (secret)
 * que cumpla con los estándares de seguridad recomendados. Según la especificación JWT JWA (RFC 7518, Sección 3.2),
 * las claves utilizadas con algoritmos HMAC-SHA deben tener una longitud mínima igual o superior a 256 bits.
 * Esto asegura que la clave sea suficientemente robusta contra intentos de ataques por fuerza bruta.
 *
 * El siguiente código genera una clave segura usando el algoritmo HS256 (HMAC con SHA-256), que es uno de los algoritmos
 * más comunes para firmar tokens JWT. La clave generada cumple con la longitud mínima requerida de 256 bits.
 
 * Referencia:
 * - JWT JWA Specification RFC 7518, Section 3.2: https://tools.ietf.org/html/rfc7518#section-3.2
 
 *
  public class SecretKeyGenerator {

    public static void main(String[] args) {
        SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Usa HS256 como algoritmo
        String encodedSecret = java.util.Base64.getEncoder().encodeToString(secretKey.getEncoded());
        System.out.println("JWT Secret: " + encodedSecret);
    }
}
 *
 */




