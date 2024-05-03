# DevEx + Developer Productivity

## DevEx
Se analizo el proyecto teniendo en cuenta las 3 dimensiones de DevEx
### Feedback loops
**Estado original del proyecto:**
- El proyecto no contaba con pruebas unitarias, ni alguna estrategia de integración continua.
- El proyecto tampoco define una estrategia de despliegue o implementación de ningún tipo.

**Estado actual de esta versión del proyecto**

- Cómo parte de la entrega anterior [CSDT_PrimeraEntrega2024.md](CSDT_PrimeraEntrega2024.md) se realizo la integración de la herramienta de SonarCloud para recibir retroalimentación de esta herramienta en cada pull request o al subir cambios directamente a master.
- En la entrega anterior también se realizo la configuración para poder ejecutar pruebas con el comando `npm run test`, generar la cobertura con el comando `npm run coverage` y una ejecución de pruebas especial con el comando `npm run test:watch`. Todos los comandos agregados son una ayuda para retroalimentar información al desarrollador pero el comando `npm run test:watch` pienso tiene una mayor relevancia en este aspecto ya que si lo ejecutamos tendremos un menu activo en consola con el que podemos ir ejecutando las pruebas mientras vamos desarrollando.

    ![test-watch]({{site.baseurl}}/img/test-watch.png)

- Cómo parte de esta entrega se agrego al workflow una github action para validar la instalación, construcción y ejecución de pruebas del proyecto. Con el objetivo de recibir la retroalimentación del estado de los paquetes y las pruebas en caso de que algo en los paquetes o en las pruebas este mal, tener esta verificación de manera automática antes de subir cualquier cambio y no dejarle toda la responsabilidad de esta validación a los desarrolladores.

### Cognitive load
- Respecto al código no es difícil de entender, son funciones o líneas muy cortas por archivo por lo que la complejidad del código es baja.
- Debuggear los errores no es complejo por la naturaleza del proyecto, por lo general si algo falla es un comando y se buscaría el error en el archivo del comando.
- El proyecto tiene muy poca documentación, solo tiene los pasos básicos en el readme pero no es tan explicito con las instrucciones para ejecutar el bot. Una mejora en el proyecto que reduciría la carga cognitiva del desarrollador sería documentar explícitamente estos procesos de instalación y configuración en alguna especie de guía.
- Otra mejora podría ser documentar los comandos del bot y mantener actualizado cuales funcionan, cuales no y cuales requieren configuraciones adicionales.

## SPACE

### Satisfaction and well-being
No aplica.

### Performance
Podemos medir el rendimiento de las siguientes maneras:
- Midiendo el tiempo de respuesta del bot a los comandos.
- Observando el uso de recursos del bot, incluyendo CPU, memoria y almacenamiento.
- Monitoreando la disponibilidad del bot, es decir, cuánto tiempo está en línea y disponible para responder a los comandos.
- Rastreando la tasa de errores durante la ejecución del bot.
- Evaluando la capacidad de carga del bot, o cuántos comandos puede manejar simultáneamente sin degradar el rendimiento.

### Activity
Podemos medir la actividad de las siguientes maneras:
- Contando el número de tareas que el bot puede completar en un período de tiempo determinado.
- Calculando la tasa de éxito de las tareas, o la proporción de tareas que el bot puede completar con éxito sin errores.
- Calculando un contador o porcentaje de cuantos comandos están documentados.
- Contando el número de pruebas ejecutadas por solicitud de cambios en el pipeline de integración continua.
- Hacer un seguimiento y conteo de los errores encontrados y ajustados.

### Communication and Collaboration
Podemos medir la comunicación y la colaboración de las siguientes maneras:
- Realizando encuestas para medir la calidad de la comunicación y facilidad de uso del bot.
- Midiendo el tiempo que le cuesta a los desarrolladores desde cero entender el proyecto y poder trabajar en él.
- Guardar reportes, peticiones y sugerencias respecto al bot que puedan tener los usuarios.

Con una mejor documentación la colaboración del proyecto mejoraría bastaste.

### Efficiency and Flow
Podemos medir la eficiencia y el flujo de las siguientes maneras:
- Contando el número de interrupciones que los usuarios experimentan al usar el software.
- Contando el número de solicitud de cambios y revisiones.
- Guardar los tiempos que suelen tomar las revisiones de las solicitudes de cambios.


## Herramientas IA

### Github Copilot
Como parte de la entrega anterior se realizo una [prueba](/test/classes/voting-handler.test.js) para la clase [VotingHandler](/src/classes/voting-handler.js) con el apoyo de github copilot. Podemos hacerle peticiones para generar documentación, pruebas, resolver bugs, implementar mejoras en nuestro código, etc. Sin embargo es importante resaltar que como su nombre lo indica es un copiloto, a veces lo que genera podría no servir o tener ciertos aspectos que nosotros debemos ajustar, pero aún así es una excelente herramienta con la que podemos mejorar nuestro código, en especial cuando se trata de realizar tareas repetitivas.

**Demostración:**

- Se le pidió que generara un set de pruebas para el archivo [memes.js](/cmd/memes.js).

    ![copilot-tests-generator]({{site.baseurl}}/img/copilot-tests-generator.png)

    El resultado del nuevo archivo de pruebas se encuentra en [test/cmd/memes.test.js](/test/cmd/memes.test.js)


- Se le pidió que explicará el index del proyecto.

    ![copilot-explain]({{site.baseurl}}/img/copilot-explain.png)

Estas solo son pequeñas demostraciones de las ayudas que nos ofrece github copilot.

### Mintlify

[Mintlify](https://mintlify.com) es una herramienta muy buena y con versión gratuita que usa IA para generar la documentación de proyectos de código. Cuenta con funciones para analizar un proyecto y generar un API documentada, generar guías de configuración, documentar clases, funciones, etc.

**Demostración:**

- Se utilizo la extensión de VSCode para generar la documentación de la función `getRandomMeme`.

    ![Mintlify]({{site.baseurl}}/img/mintlify.png)

    La extensión automáticamente detecto el lenguaje, entendió la función y genero la documentación.

    ```JavaScript
        /**
         * The function `getRandomMeme` fetches a random meme from the r/memes subreddit on Reddit and returns its title, image URL, subreddit name, and permalink.
         * @returns The `getRandomMeme` function returns a Promise that resolves to an object containing information about a random meme with the following properties:
         * - `title`: The title of the meme post
         * - `image`: The URL of the meme image
         * - `subreddit`: The subreddit where the meme was posted
         * - `permalink`: The permalink URL of the meme post on Reddit
         *
         * If there is an error during the fetching process, the function will return `null`.
        */
        async function getRandomMeme() {
            try {
                const response = await axios.get('https://www.reddit.com/r/memes/random/.json');
                const post = response.data[0].data.children[0].data;
                const meme = {
                title: post.title,
                image: post.url,
                subreddit: post.subreddit,
                permalink: `https://reddit.com${post.permalink}`
                };
                return meme;
            } catch (error) {
                console.error('Error fetching meme:', error);
                return null;
            }
        }
    ```

Esta herramienta puede ser bastante útil en casos donde el código sea muy viejo, no sea claro o solo no se haya hecho la debida documentación mientras se desarrollaba.