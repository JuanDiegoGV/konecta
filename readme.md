# COMO INICIAR EL PROYECTO

### Requisitos.
Debe tener docker instalado en su equipo.
Si tiene problemas revise que los puertos no esten ocupados en su equipo.

### 1. Docker.

##### 1.1 Asegurese de estar en la carpeta raiz /konecta.
##### 1.2 Abra una consola sobre esta carpeta.
##### 1.3 Ejecute el comando `cd backend` y luego el comando `docker build . -t backend:latest`.
##### 1.4 Ejecute el comando `cd ../frontend` y luego el comando `docker build . -t frontend:latest`.
##### 1.5 Ejecute el comando `cd ..` y luego el comando `docker-compose up`.

### 2. Postgres.

##### 1.1 Abra en su navegador la direccion [pgAdmin](http://localhost:5050/).
##### 1.2 Logearse con las credenciales email: admin@admin.com y password:root.
##### 1.3 Dar click derecho en la pestaña Servers, luego en Register y luego en Server.
##### 1.4 En el campo Name escribir 'konecta'.
##### 1.4 Luego en la pestaña Connection en el campo Host name escribir 'database', en el campo Username escribir 'postgres' y en el campo Password escribir 'root', luego dar click en save.
##### 1.5 Desplegar el menu de konecta, luego en Databases y luego en la base de datos konecta.
##### 1.6 Dar click derecho sobre la base de datos konecta, luego en Restore.
##### 1.7 En el campo Filename daremos click sobre el icono de carpeta, en la ventana que nos abre daremos click en los tres puntos de la esquina superior derecha, luego en Upload.
##### 1.8 Ahora arrastraremos sobre esta nueva ventana el archivo database.sql en la carpeta /konecta/backup, una vez subido daremos click en el icono de cerrar la ventana (Diferenciar del icono de eliminar el archivo recien subido), luego seleccionamos el archivo database.sql y click en select.
##### 1.9 Luego click en Restore.

### 3. konecta.

##### 1.1 Abra en su navegador la direccion [konecta](http://localhost/login).
##### 1.2 Logearse con las credenciales id: 1 y password:contrasena, (en caso de querer loguearse como un empleado sin permisos de administrador usar id: 2 password: contrasena ).


# MEJORES PRACTICAS Y SEGURIDAD

### 1. General.
#### 1.1. Tener las versiones de las librerias de forma exacta, es decir, sin el simbolo ^, esto para tener mayor control y actualizar de forma manual y consciente los paquetes.
#### 1.2 Usar convenciones como standard js para consistencia en el codigo.

### 2. Backend.
#### 2.1. Configurar correctamente los headers en las peticiones http para garantizar seguridad en la comunicacion, para este fin se recomienda la libreria helmet.
#### 2.2. Dejar las variables de conexiones a bases de datos, token de apis, secretos, etc. en un archivo .env y no hacerlo publico, ya que son datos importantes, (en este caso se muestran por comodidad de revision).
#### 2.3. Cifrar el jwt de sesion generado para mayor seguridad.
#### 2.4 No guardar las contraseñas directamente en la base de datos, estas deben ir cifradas o usar otros metodos para garantizar la mayor proteccion de esta informacion.

### 3. Frontend
#### 3.1. Usar un manejador de estado diferente del Context api de react, ya que al usar esta herramienta se pueden presentar problemas de rendimiento y complejidad del codigo innecesaria, se recomienda alternativas como zustand, jotai, redux, etc.
#### 3.2. Usar una herramienta como vite.js en lugar de create-react-app ya que este ultimo esta deprecado y es bastante ineficiente.
#### 3.3. Utilizar herramientas como react-query que proporcionan gran control y utilidades para el fetching de datos, algunas ventajas son manejo de estado sobre consultas, cache, refetching, lazyLoading, etc.