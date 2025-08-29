<comment-tag id="1">## 🚀 Tecnologías

Node.js: Entorno de ejecución de JavaScript del lado del servidor.

NestJS: Un framework progresivo de Node.js para construir aplicaciones del lado del servidor.

Lambda: Utilizado para desplegar y ejecutar el código en un entorno sin servidor.</comment-tag id="1" text="Las listas con elementos separados por un salto de línea adicional pueden dificultar la lectura y no son una práctica estándar en Markdown. Agrupar los elementos de la lista en una estructura más compacta mejora la claridad y la presentación.
'## 🚀 Tecnologías

Node.js: Entorno de ejecución de JavaScript del lado del servidor.

NestJS: Un framework progresivo de Node.js para construir aplicaciones del lado del servidor.

Lambda: Utilizado para desplegar y ejecutar el código en un entorno sin servidor.'" type="suggestion">

⚙️ Instalación

Sigue estos sencillos pasos para tener el proyecto funcionando en tu máquina local.

Clona el repositorio en tu máquina:

<comment-tag id="2">```
git clone https://github.com/tu-usuario/company-adhesion-manager.git

</comment-tag id="2" text="El formato del comando git clone es incorrecto y no es legible como una URL estándar. Los `backticks` (` `) están destinados a mostrar código literal, no enlaces. Eliminar la sintaxis de enlace y dejar solo el comando git clone completo es más claro y es la forma correcta de presentar este tipo de información en un README. '
git clone https://www.google.com/search?q=https://github.com/tu-usuario/company-adhesion-manager.git

">
2. Navega hasta el directorio del proyecto en tu terminal.

   <comment-tag id="3">```
   cd company-adhesion-manager
   
   ```</comment-tag id="3" text="Eliminar el salto de línea adicional dentro de los bloques de código mejora la claridad y la concisión del documento. Es una pequeña corrección que hace que el README se vea más limpio y profesional.
'```
cd company-adhesion-manager
```'" type="suggestion">

3. Instala las dependencias del proyecto.

   <comment-tag id="4">```
   npm i
   
   ```</comment-tag id="4" text="Eliminar el salto de línea adicional dentro del bloque de código es una pequeña mejora de formato. Hace que la sección se vea más limpia y profesional.
'```
npm i
```'" type="suggestion">

## ▶️ Uso del Proyecto

Una vez que tengas el proyecto instalado, puedes probarlo de forma local.

1. Inicia el servidor de desarrollo.

   <comment-tag id="5">```
   npm run start
   
   ```</comment-tag id="5" text="Eliminar el salto de línea adicional dentro del bloque de código. Este cambio mejora el formato y la legibilidad general del documento, haciéndolo más limpio y profesional.
'```
npm run start
```'" type="suggestion">

2. Accede a las rutas de la API desde tu navegador o una aplicación como [Insomnia](https://insomnia.rest/) o [Postman](https://www.postman.com/). La URL base es `http://localhost:3000`.

### Endpoints Disponibles

* **`GET /transfers`**: Obtiene una lista de las empresas que transfirieron en el último mes.

* **`GET /adhesions`**: Obtiene una lista de las empresas que se adhirieron en el último mes.

* **`POST /adhesion`**: Agrega una nueva empresa a la base de datos.
  **Body de la solicitud:**

{
"name": "Pyme Tech Example",
"type": "Pyme",
"transferDates": []
}

<comment-tag id="6">*Nota: La fecha de adhesión y el ID de la empresa se generarán automáticamente.*</comment-tag id="6" text="Esta nota es importante, pero su formato es un poco informal y se pierde visualmente. Incorporar la información directamente en la descripción del endpoint, usando la sintaxis de lista de Markdown, la hace más prominente y fácil de leer.
'**`POST /adhesion`**: Agrega una nueva empresa a la base de datos.
**Body de la solicitud:**
```json
{
	"name": "Pyme Tech Example",
	"type": "Pyme",
	"transferDates": []
}

✅ Pruebas
El proyecto incluye pruebas unitarias para asegurar la calidad del código.

">
* Verifica el porcentaje de cobertura de código:

  <comment-tag id="8">```
  npm run test:cov
  
  ```</comment-tag id="8" text="Eliminar el salto de línea adicional dentro del bloque de código. Esto hace que el formato sea más consistente con las mejores prácticas y mejora la legibilidad.
'```
npm run test:cov
```'" type="suggestion">

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
