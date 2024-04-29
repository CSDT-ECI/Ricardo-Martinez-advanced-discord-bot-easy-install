# Deuda de arquitectura bot discord
## Introducción
En el proyecto de desarrollo de un bot para discord se identificaron varios problemas relacionados con la arquitectura del proyecto, los cuales se presentan en este documento. El objetivo de este documento es identificar atributos de calidad relevantes para la construcción de un bot de discord, identificar los problemas de arquitectura y proponer soluciones para mejorar la calidad del proyecto.

## Atributos de calidad relevantes

### Rendimiento
El bot de discord debe ser capaz de manejar un gran número de usuarios y servidores sin afectar su rendimiento. La velocidad de respuesta y la capacidad de procesamiento son atributos de calidad importantes para garantizar una experiencia fluida para los usuarios.

### Usabilidad
El bot de discord debe ser fácil de usar y comprender para los usuarios. La usabilidad es un atributo de calidad importante para garantizar que los usuarios puedan interactuar con el bot de manera efectiva y sin problemas.

### Mantenibilidad
El código del bot debe ser fácil de mantener y extender. La mantenibilidad es un atributo de calidad importante para garantizar que el bot pueda evolucionar con el tiempo y adaptarse a los cambios en los requerimientos.

El código del bot también debe estar documentado y con pruebas para los comandos. Para que les sea más fácil a otros desarrolladores trabajar en él.

### Confiabilidad
El bot de discord debe ser confiable y estar disponible en todo momento. La confiabilidad es un atributo de calidad importante para garantizar que el bot pueda funcionar de manera consistente y sin errores.

### Seguridad
El bot de discord debe ser seguro y proteger la información sensible de los usuarios. La seguridad es un atributo de calidad importante para garantizar la privacidad y la integridad de los datos.

### Comprobabilidad (Testability)
El bot de discord debe ser fácil de probar y validar para garantizar su calidad y su correcto funcionamiento. La comprobabilidad es un atributo de calidad importante para garantizar que el bot pueda ser probado y validado de manera efectiva.

## Análisis de arquitectura

### Rendimiento

✅ El bot es eficiente y no se encontraron problemas de rendimiento significativos, esto se debe directamente al API de discord que maneja las peticiones de manera eficiente y rápida.

### Usabilidad

✅ El código del bot cuenta con un comando de ayuda `help` que despliega una nota con información de todos los comandos.

![help command](/img/help-command-sample.png)

❌ Debido a la forma en la que se crean y se cargan los comandos estos no aparecen en el autocompletar del chat de discord ni aparecen como comandos disponibles. Esto se debe a que el bot guarda los comandos en una lista interna pero no los comunica a discord.

**Recomendaciones:**

- Actualizar la versión de la librería de discord a una más reciente
- Crear un nuevo script para registrar los comandos con la librería de discord para que aparezcan en los servidores.
- Actualizar el index para cargar los comandos del bot de manera correcta con la librería de discord.

### Mantenibilidad

❕ Debido a la naturaleza del proyecto, es bastante sencillo agregar un comando nuevo o modificar los comandos existentes. A excepción de aquellos que utilizan APIs externas

❌ El proyecto no cuenta con pruebas automatizadas para los comandos, esto dificulta la detección de errores y la validación de los comandos.

❌ El proyecto no cuenta con documentación util y clara para desarrolladores que deseen contribuir al proyecto.

❌ El proyecto no cuenta con variables de entorno y tiene credenciales quemadas en el archivo settings.json

❌ El proyecto no cuenta con un sistema de carpetas.

- Todos los comandos están en una sola carpeta.
- Maneja todos los archivos de código desde la raíz, originalmente solo tenia el index y la carpeta cmd con todos los comandos.

**Recomendaciones:**
- Crear una carpeta para cada tipo de archivo (comandos, eventos, etc) dentro de la carpeta `src`.
- Ademas de diferenciar por tipo de archivo separar los comandos en módulos para una mejor estructura y organización del código.

    - admin: Este módulo podría contener comandos relacionados con la administración del servidor, como banear o desbanear usuarios, cambiar roles, etc.

    - fun: Este módulo podría contener comandos para interacciones divertidas, como juegos, información de juegos, chistes, memes, etc.

    - info: Este módulo podría contener comandos útiles, como comandos para obtener información sobre el servidor o los usuario, etc.

    - moderation: Este módulo podría contener comandos para la moderación del servidor, como eliminar mensajes, silenciar usuarios, etc.

    - tools: Este módulo podría tener comandos con herramientas cómo por ejemplos los comandos que consultan apis externas.

- Crear pruebas automatizadas para los comandos del bot.
- Usar variables de entorno.
- Documentar el proyecto con información relevante para desarrolladores que deseen contribuir al proyecto:

    - Información acerca los requisitos básicos para desplegar el bot
    - Formas y herramientas para ejecutarlo
    - Información de las integraciones y las APIs que usa en ciertos comandos
    - Una lista de comandos.

### Confiabilidad

❌ El bot es propenso a sufrir excepciones y no esta preparado para manejarlas. Al recibir una excepción o un error de algún tipo, detiene su ejecución.

**Recomendaciones:**

- Implementar un manejador de excepciones para evitar que el bot se detenga al recibir una excepción.
- Implementar un sistema de logs para registrar las excepciones y los errores que se producen.

### Seguridad

❌ El bot no cuenta con una política de seguridad establecida, ni con una guía de buenas prácticas de seguridad.

❌ El bot no cuenta con un sistema de autenticación y autorización para proteger las rutas y los comandos sensibles.

❌ El bot no cuenta con un sistema de cifrado para proteger la información sensible de los usuarios.

**Recomendaciones:**

- Crear una política de seguridad para el proyecto.
- Implementar un sistema de autenticación y autorización para proteger los comandos y las rutas sensibles.
- Implementar un sistema de cifrado para proteger la información sensible de los usuarios.

### Comprobabilidad

❌ El bot no cuenta con pruebas automatizadas para los comandos, lo cual dificulta la validación y la detección de errores.

**Recomendaciones:**

- Crear pruebas automatizadas para los comandos del bot.
- Implementar un sistema de integración continua para ejecutar las pruebas automáticamente. (Ya implementado en entregas anteriores)

## Conclusiones
El bot de discord presenta varios problemas relacionados con la arquitectura del proyecto que afectan la calidad del software. Los problemas identificados incluyen la falta de pruebas automatizadas, la falta de documentación, la falta de manejo de errores y la falta de medidas de seguridad para proteger las credenciales del bot. Se propusieron soluciones para mejorar la calidad del proyecto y garantizar que cumpla con los atributos de calidad relevantes.

## Links útiles 🤖

- [Discord.js](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/docs/intro)
- [Buenas prácticas para bots de Discord.](https://github.com/Vicente015/buenas-practicas-bots-discord)
