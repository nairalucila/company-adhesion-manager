# Company Adhesion Manager
Este repositorio contiene el código para la aplicación Company Adhesion Manager, una API diseñada para gestionar la adhesión y transferencias de empresas. Está construida para ser un servicio backend eficiente y escalable.

## 🚀 Tecnologías

* **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.

* **NestJS**: Un framework progresivo de Node.js para construir aplicaciones del lado del servidor.

* **Lambda**: Utilizado para desplegar y ejecutar el código en un entorno sin servidor.

---

## ⚙️ Instalación

Sigue estos sencillos pasos para tener el proyecto funcionando en tu máquina local.

1. Clona el repositorio en tu máquina o descargalo como zip.

   ```bash
   git clone https://github.com/nairalucila/company-adhesion-manager.git

2. Navega hasta el directorio del proyecto en tu terminal.

   ```bash
	cd company-adhesion-manager

3. Instala las dependencias del proyecto.

   ```bash
	npm i

## ▶️ Uso del Proyecto

Una vez que tengas el proyecto instalado, puedes probarlo de forma local.
La API cuenta con 3 endpoints según los requerimientos estimados. La API permite agregar una empresa que puede ser Pyme o Corporativa. Mediante un endpoint se podrá obtener una lista de aquellas empresas que hicieron transferencias en el último mes según el mes actual. Y el último endpoint permite obtener una lista de aquellas empresas que se adhirieron en el último mes según el mes actual.
Lo que se utilizó para persistir los datos es un archivo JSON que se encuentra en la carpeta src/utils/json-company-data.json el cual puede ser leído y modificado.


1.  Inicia el servidor de desarrollo.
    ```bash
    npm run start
    ```

2.  Accede a las rutas de la API desde tu navegador o una aplicación como [Insomnia](https://insomnia.rest/) o [Postman](https://www.postman.com/). La URL base es `http://localhost:3000`.

### Endpoints Disponibles

* `GET /transfers`: Obtiene una lista de las empresas que transfirieron en el último mes.
* `GET /adhesions`: Obtiene una lista de las empresas que se adhirieron en el último mes.
* `POST /adhesion`: Agrega una nueva empresa a la base de datos.

  **Body de la solicitud:**
    ```json
    {
    	"name": "Pyme Tech Example",
    	"type": "Pyme | Corporativa",
    	"adhesionDate": "2025-07-22",
    	"transferDates": []
    }
    ```
    *Nota: El ID y la fecha de adhesión si no existe se generarán automáticamente por lo que no son mandatorios*

---

## ✅ Pruebas

El proyecto incluye pruebas unitarias para asegurar la calidad del código.

* Ejecuta todas las pruebas unitarias:
    ```bash
    npm run test
    ```
* Verifica el porcentaje de cobertura de código:
    ```bash
    npm run test:cov
    ```

---

## 📄 Licencia

Este proyecto está bajo la [Licencia MIT](https://opensource.org/licenses/MIT).
