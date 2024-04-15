# Deuda técnica en procesos

## Integración Continua con Github Actions

En entregas anteriores se hicieron las configuraciones para un flujo de trabajo usando github actions en el archivo [build.yml](/.github/workflows/build.yml)

Donde hasta el momento hay definidos dos trabajos (Jobs):

1. Node CI
2. SonarCloud

### 1. Node CI
Contiene una serie de pasos para validar la instalación, construcción y ejecución de pruebas del proyecto con node.

Los pasos principales que usa este trabajo son:

- Ejecutar `npm ci` la cual es una herramienta de npm que sirve para validar la integridad de los paquetes y la instalación de estos, a diferencia de `npm install` este comando no instala paquetes ni escribe en los archivos de paquetes de node. Este comando valida la integridad de los paquetes, si el package.json y el package-lock.json tienen alguna discrepancia o si no puede instalar alguno de los paquetes o sus dependencias arrojara un error.

- Ejecutar `npm test` para validar que las pruebas se ejecuten y se cumplan correctamente.

- [NUEVO] Se agregó un nuevo workflow con dos acciones: `npm run coverage` para generar un reporte de cobertura y una nueva acción llamada 'Archive code coverage results' para guardar los resultados de cobertura en un artefacto.

    Ahora cuando se suban cambios a la rama master se podrá descargar un zip con el reporte de cobertura.

    ![Coverage Artifact](/img/coverage-artifact.png)

### 2. SonarCloud
Escanea el proyecto en cada pull request abierto o reabierto, cuando se suban cambios a una rama con un PR abierto y cuando se suban cambios a la rama principal. usando la herramienta SonarCloud para revisar la calidad del código del proyecto, esto también incluye la cobertura de las pruebas más sobre la implementación de esta herramienta en [CSDT_PrimeraEntrega2024.md](CSDT_PrimeraEntrega2024.md)
