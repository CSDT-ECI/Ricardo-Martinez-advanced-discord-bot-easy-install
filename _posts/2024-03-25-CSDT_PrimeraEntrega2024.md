# CSDT Primera Entrega Bitacora
El objetivo de este archivo es consolidar los diferentes análisis y entregas que se han hecho hasta la fecha sobre el estado de calidad del proyecto y agregar nuevos aportes, análisis y conclusiones de este.

## Aportes Previos
- [Refactoring + Code Smells]({{site.baseurl}}/2024/03/10/CSDT-2024#refactoring--code-smells)
- [Clean Code + XP Practices]({{site.baseurl}}/2024/03/10/CSDT-2024#clean-code--xp-practices)
- [Testing Debt]({{site.baseurl}}/2024/03/17/TestingDebt)

## Tabla de contenidos
- [SonarCloud](#sonarcloud)
    - [Reliability](#reliability)
    - [Security](#security)
    - [Security Review](#security-review)
    - [Maintainability](#maintainability)
    - [Coverage](#coverage)
    - [Duplications](#duplications)
- [Otras Recomendaciones](#otras-recomendaciones)
    - [NPM](#npm)
    - [Pruebas](#pruebas)
- [Conclusiones](#conclusiones)
- [Badges](#badges)

## Sonarcloud
Se realizó un primer análisis del código actual del proyecto usando la herramienta SonarCloud y arrojo los siguientes resultados:

![sonarcloud-first-analysis]({{site.baseurl}}/img/sonarcloud-first-analysis.png)

### Reliability
Se obtuvo una calificación de C en esta métrica. Lo que quiere decir que la aplicación cuenta con al menos un bug mayor.

![Reliability bug]({{site.baseurl}}/img/self-role-reliability-bug.png)

Después de revisar el reporte se encontró que el bug que reporta se encuentra en el archivo [selfrole.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/src/commands/selfrole.js) en el ciclo de la función RoleChecker que valida los roles.

```javascript
for(var currentStatIndex = 0; currentStatIndex < notAllowed.length; currentStatIndex++) {
    if(SELF_ROLE == notAllowed[currentStatIndex]){
    return msg.reply("You are not allowed to self assign the role: " + role.name)
    }else{
    return target.addRole(role.id).then(() => {
        msg.channel.send(`You have been given the: "${role.name}" role!`)
    })
    }
}
```

El problema reportado es que este es un ciclo que realiza solo una iteración. Y revisando el código podemos observar que la validación que hace sobre los roles esta siendo realizada de manera incorrecta. Cómo esta estructurado el código solo validara que el rol que se desea agregar no sea igual al primero en la lista, falta hacer la validación con los demás roles. Otro problema es que el código no es lo suficientemente claro para que cualquiera pueda entenderlo. 

Esta es una propuesta de mejora para esta parte del código:

```javascript
let isRoleAddAllowed = !notAllowed.includes(SELF_ROLE);
if (!isRoleAddAllowed) {
    msg.reply("You are not allowed to self assign the role: " + role.name);
    return;
}
target.addRole(role.id).then(() => {
    msg.channel.send(`You have been given the: "${role.name}" role!`);
});
```

### Security
Se obtuvo una calificación de A en esta métrica. Lo que quiere decir que no cuenta con vulnerabilidades

### Security Review
La herramienta encontro 9 security hotspots y obtuvo una calificación de E en esta métrica. Lo que quiere decir que el porcentaje de revisión de los security hotspots es menor al 30%. Los security hotspots son posibles problemas de seguridad que requieren una revisión manual para determinar si esas alertas corresponden a una amenaza o no.

### Maintainability
La herramienta encontró un total de 89 malos olores y obtuvo una calificación de A en esta métrica. Lo que quiere decir que el coeficiente de deuda técnica del código del proyecto es menor al 5 %. Por lo que se interpreta que el esfuerzo requerido para limpiar el código es de un día o menos.

La herramienta también clasifico los malos olores en 3 niveles de severidad.

![code-smells-severity]({{site.baseurl}}/img/code-smells-severity.png)

### Coverage
La herramienta encontró un 0% de cobertura (líneas cubiertas por pruebas) en el código del proyecto. Esto se debe a que el proyecto no cuenta con pruebas.

El análisis sobre las posibles pruebas y recomendaciones para agregar pruebas al proyecto se encuentran en [Testing Debt]({{site.baseurl}}/2024/03/17/TestingDebt).

### Duplications
La herramienta encontró un 3% de duplicaciones de código. Después de revisar el reporte, este resultado se debe a que en los archivos [vote.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/src/commands/vote.js) y [votekick.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/src/commands/votekick.js) se repite el siguiente bloque de código:


```javascript
  let VOTE_TEXT = await msg.channel.send("Vote now! (10 Seconds)");
  await VOTE_TEXT.react(agree);
  await VOTE_TEXT.react(disagree);

  const reactions = await VOTE_TEXT.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 10000});
  VOTE_TEXT.delete();

  var NO_Count = reactions.get(disagree).count;
  var YES_Count = reactions.get(agree);

  if(YES_Count == undefined){
    var YES_Count = 1;
  }else{
    var YES_Count = reactions.get(agree).count;
  }

  var sumsum = new Discord.RichEmbed()
            .addField("Voting Finished:", "----------------------------------------\n" +
                                          "Total votes (NO): " + `${NO_Count-1}\n` +
                                          "Total votes (Yes): " + `${YES_Count-1}\n` +
```
Para solucionar esto la propuesta es crear una clase con las funciones para ejecutar el proceso de votación y que la usen los comandos [vote.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/src/commands/vote.js) y [votekick.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/src/commands/votekick.js).


[Voting Handler Class](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/master/src/classes/voting-handler.js)

Usando esta clase, el código que implementarian los comandos sería:

- [vote.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/src/commands/vote.js)

    ```Javascript
    const options = [
        { name: "Yes", emoji: agree },
        { name: "No", emoji: disagree},
    ];

    let votingHandler = new VotingHandler(
        "Vote now! (10 Seconds)",
        options,
        10000,
        msg.channel
    );
    votingHandler.performVotingProcess();
    ```


- [votekick.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/src/commands/votekick.js)

    ```Javascript
    const options = [
        { name: "Yes", emoji: agree },
        { name: "No", emoji: disagree},
    ];

    const voteText = `Do you want to kick ${kickmember.user.username}? Vote now! (10 Seconds)`;
    let votingHandler = new VotingHandler(
        voteText,
        options,
        10000,
        msg.channel
    );

    const reactions = await votingHandler.performVotingProcess();
    const YES_Count = reactions.get(agree).count ?? 0;
    const NO_Count = reactions.get(disagree).count ?? 0;
    ```
Con esta solución no solo se evita el código duplicado, sino que queda abierta la funcionalidad para manejar diferentes tipos de votación o configurar los parámetros como el mensaje y los tiempos de respuesta desde la invocación del comando.

## Otras recomendaciones

### NPM
La herramienta de paquetes de node encontró 20 vulnerabilidades en los paquetes instalados y especificados en los archivos package*.json

![packages warn]({{site.baseurl}}/img/packages-warning.png)

Para revisar a detalle los paquetes que necesitan actualización se ejecuta el siguiente comando:
```properties
npm audit
```

Para usar la herramienta de paquetes de node para actualizar los paquetes se ejecuta:
```properties
npm audit fix --force
```

La herramienta solo pudo actualizar algunos paquetes:

![packages audited]({{site.baseurl}}/img/packages-audited.png)

Después de revisar los demás paquetes que presentan vulnerabilidades, se encontró que son los paquetes `dankmemes` que solo se usa en el archivo [memes.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/src/commands/memes.js) para generar memes, el paquete `google-images` que se usa en el comando [images.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/src/commands/images.js) para generar imágenes usando el api de google y el paquete `requests` que se usa para hacer una petición a una página y obtener la información html de un perfil en el comando [csgo.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/src/commands/csgo.js).

- dankmemes

    Presenta la mayor cantidad de vulnerabilidades, 7 altas y 1 moderada. Sin mencionar que tal vez debido a la antigüedad del paquete usado, el comando genera un error cuando se usa.

    ![Memes Error]({{site.baseurl}}/img/memes-error.png)

    Para mitigar estas vulnerabilidades que parecen ser las más graves se ajusto el comando de memes para consultar una url que genera memes de manera aleatoria usando axios en el archivo [memes.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/src/commands/memes.js).

    ![Meme displayed]({{site.baseurl}}/img/meme-displayed.png)

- google-images

    Presenta dos vulnerabilidades moderadas las cuales consisten en depender de versiones vulnerables de otros paquetes.

- requests

    Presenta dos vulnerabilidades moderadas las cuales consisten en depender de versiones vulnerables de otros paquetes.

    Después de investigar parece que la ruta de csgo tracker fue bajada o ya no esta en funcionamiento. Habría que buscar otras APIs para hacer el tracking o bajar el comando.

Al actualizar los paquetes y ajustar el comando de memes se redujeron bastante las vulnerabilidades de paquetes que se reportaron.

![Packages Remaining Vulnerabilities]({{site.baseurl}}/img/packages-remaining-vulnerabilities.png)

### Pruebas

Cómo parte de esta entrega se realizaron las configuraciones necesarias para ejecutar pruebas unitarias de manera local con el comando `npm run test`, generar un informe de cobertura con el comando `npm run coverage` y revisar el nivel de cobertura en la herramienta de sonar con jest.

Y cómo primer acercamiento a la implementación de pruebas de este proyecto se creó el archivo de pruebas [voting-handler.test.js](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/github_pages/test/classes/voting-handler.test.js) para realizar la prueba de la nueva clase y validar la ejecución de pruebas en el proyecto.

![Voting Handler Test]({{site.baseurl}}/img/voting-handler-test.png)


## Conclusiones
- El bot de discord mantiene un funcionamiento básico sin embargo después de los análisis y pruebas de ejecución de los diferentes comandos es evidente que se requiere una refactorización para eliminar todos los malos olores y problemas de lógica o ejecución que tiene actualmente.

- Las integraciones con plataformas externas no son claras y el hecho de usar un archivo .json para estas llaves y ids que requiere el bot lo hace difícil de entender e implementar. Cómo primer paso se debe empezar por cargar estos datos usando variables de entorno y agregar un archivo `.env.example` para que cualquier persona que quiera implementar el bot sepa claramente que datos necesita el bot.

- Aprovechando que se debe hacer una refactorización del código de los comandos. Se ve la oportunidad de implementar las pruebas antes para validar el funcionamiento de los comandos.

- Herramientas generadoras de código cómo github copilot son de bastante utilidad para generar pruebas automatizadas o recibir sugerencias de implementaciones de funcionalidades en el código.


## Badges

[![Build](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/actions/workflows/build.yml/badge.svg)](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/actions/workflows/build.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=CDST-Ricardo-Martinez_Ricardo-Martinez-advanced-discord-bot&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=CDST-Ricardo-Martinez_Ricardo-Martinez-advanced-discord-bot)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=CDST-Ricardo-Martinez_Ricardo-Martinez-advanced-discord-bot&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=CDST-Ricardo-Martinez_Ricardo-Martinez-advanced-discord-bot)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=CDST-Ricardo-Martinez_Ricardo-Martinez-advanced-discord-bot&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=CDST-Ricardo-Martinez_Ricardo-Martinez-advanced-discord-bot)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=CDST-Ricardo-Martinez_Ricardo-Martinez-advanced-discord-bot&metric=coverage)](https://sonarcloud.io/summary/new_code?id=CDST-Ricardo-Martinez_Ricardo-Martinez-advanced-discord-bot)
