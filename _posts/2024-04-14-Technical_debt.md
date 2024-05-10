---
title: "Deuda técnica en procesos"
date: 2024-04-14
---

# Deuda técnica en procesos

## Integración Continua con Github Actions

En entregas anteriores se hicieron las configuraciones para un flujo de trabajo usando github actions en el archivo [build.yml](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/master/.github/workflows/build.yml) Donde hasta el momento hay definidos dos trabajos (Jobs):

1. Node CI
2. SonarCloud

### 1. Node CI
Contiene una serie de pasos para validar la instalación, construcción y ejecución de pruebas del proyecto con node.

Los pasos principales que usa este trabajo son:

- Ejecutar `npm ci` la cual es una herramienta de npm que sirve para validar la integridad de los paquetes y la instalación de estos, a diferencia de `npm install` este comando no instala paquetes ni escribe en los archivos de paquetes de node. Este comando valida la integridad de los paquetes, si el package.json y el package-lock.json tienen alguna discrepancia o si no puede instalar alguno de los paquetes o sus dependencias arrojara un error.

- Ejecutar `npm test` para validar que las pruebas se ejecuten y se cumplan correctamente.

### 2. SonarCloud
Escanea el proyecto en cada pull request abierto o reabierto, cuando se suban cambios a una rama con un PR abierto y cuando se suban cambios a la rama principal. usando la herramienta SonarCloud para revisar la calidad del código del proyecto, esto también incluye la cobertura de las pruebas más sobre la implementación de esta herramienta en [CSDT_PrimeraEntrega2024.md]({{site.baseurl}}/2024/03/25/CSDT_PrimeraEntrega2024)

### 3. Code Coverage
Se agregó un nuevo [workflow](https://github.com/CSDT-ECI/Ricardo-Martinez-advanced-discord-bot-easy-install/tree/master/.github/workflows/code-coverage.yml) con dos acciones: `npm run coverage` para generar un reporte de cobertura y una nueva acción llamada 'Archive code coverage results' para guardar los resultados de cobertura en un artefacto.

Ahora cuando se suban cambios a la rama master se podrá descargar un zip con el reporte de cobertura de los cambios.

![Coverage Artifact]({{site.baseurl}}/img/coverage-artifact.png)

### 4. Code QL
Code QL es una herramienta de análisis estático de código desarrollada por GitHub que nos ayuda a identificar vulnerabilidades y errores en el código y los resultados los muestra como alertas en github.

Su principal característica en cuanto a seguridad es que utiliza una **Base de conocimientos compartida**. GitHub mantiene una base de conocimientos de CodeQL que cubre una amplia gama de lenguajes de programación y bibliotecas comunes.

Para esta entrega se configuro una nueva acción que usa esta herramienta para analizar los archivos en cada pull request o cambio subido a master. Lo que hace la acción es consultar de la base de conocimientos un paquete de vulnerabilidades de javascript y revisa todos los archivos con el objetivo de validar que no se encuentren vulnerabilidades en el código del proyecto. Si las hay las muestra cómo un error en la pestaña de seguridad del proyecto y el check de la acción pasa a fallido.

![Code QL]({{site.baseurl}}/img/code-ql.png)


### 5. Dependency Review
La revisión de dependencias es una herramienta que permite detectar las dependencias no seguras antes de que sean introducidas en el entorno y proporciona información sobre la licencia, los elementos dependientes y la antigüedad de las dependencias en archivos de manifiesto, cómo los workflows y los package.json.

La herramienta revisa los archivos de manifiesto que tengan cambios en la rama, y reporta el estado de las dependencias y los archivos con un puntaje de seguridad en un comentario dentro del PR que se actualiza con cada cambio, si encuentra que se esta agregando alguna dependencia insegura la acción falla.

![Dependency Review 1]({{site.baseurl}}/img/dependency-review-1.png)
![Dependency Review 2]({{site.baseurl}}/img/dependency-review-2.png)

## Resultados
Con estas configuraciones se logra tener un flujo de trabajo automatizado que valida la calidad del código, la cobertura de las pruebas y la seguridad del proyecto en cada solicitud de cambios y en cada cambio que se suba a la rama master.

## Referencias
- [Code QL](https://docs.github.com/es/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql)
- [Dependency Review](https://docs.github.com/es/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review)