# Prototipo Gestor de Contraseñas

Este es un prototipo de un gestor de contraseñas simple desarrollado con Node.js y Express



## Instalación
 Para poder ejecutrar el proyecto, se necesita tener instalado Node.js, e instalar postgreSQL como base de datos.

Primero, luego de descargar el proyecto, se debe de ejecutar el comando para obtener todas las dependencias necesarias
```bash
npm install
```

Entre las cuales se encuentran:

  -express
  -ejs
  -generate-password
  -express-session
  -bcryptjs


## Ejecución
Para ejecutar el prototipo se debe de ejecutar el siguiente comando:

```bash
  npm start
```


## Funcionalidad

La funcionalidad principal del prototipo se basa en la posibilidad de añadir una nueva credencial, esta permitirá:

-Agregar un nombre para recordar dichos datos. 
-El usuario necesario para ingresar en esa cuenta
-Una contraseña que puede ser dada por el usuario o generada siguiendo ciertos parámetros, y algún comentario pertinente.

Para probar esta funcionalidad, se debe de ingresar a traves del login del prototipo o del registro de usuario nuevo (no está programada la verificación de datos para usuarios creados), la cual llevará a un dashboard donde se deberían de mostrar las contraseñas ya creadas, y al presionar "Agregar nueva contraseña"
te llevará a la interfaz pertinente para probar esta función, se introducen los datos requeridos, y al agregar credenciales, estos datos se mostrarán en la terminal del IDE y se creará un archivo csv de no existir uno previo donde se guarden los datos de la nueva contraseña.
# Password-CSV
