# Utiliza la imagen oficial de MySQL desde Docker Hub
FROM mysql:latest

# Variables de entorno para configurar la base de datos MySQL
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${MYSQL_DATABASE}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}

# Expone el puerto por defecto de MySQL (3306)
EXPOSE ${MYSQL_PORT}

# Comando para iniciar MySQL al arrancar el contenedor
CMD ["mysqld"]