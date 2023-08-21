
# TypeScript + OpenAPI + Swapi + Serverless Project 📝  
  Proyecto que consume el API de Swapi y traduce todos las claves al español.
  
  ## Empezar 🚀  
  
  1. Ejecutar el comando `npm install` para instalar todas las depencias del proyecto.
  2. Ejecutar el comando `docker-compose up -d` para levantar la base de datos DynamoDB en un contenedor.
  3. Ejecutar el comando `npm run dev` para levantar el servidor del proyecto. 
  4. Ejecutar el comando `npm run test` para ejecutar los tests del sistema. 

  ___Nota___: Puede que al ejecutar por primera vez el proyecto aparezcan errores en la consola, 
  esto es debido a que aun no se crean los archivos de swagger, esto se corregira automaticamente y se 
  ejecutar el sistema en `http://localhost:3000`. 

  ### Rutas 🔥  

  #### Swagger:

  - http://localhost:3000/docs

  #### Species: 

  - http://localhost:3000/species/show
  - http://localhost:3000/species/get
  - http://localhost:3000/species/

  #### Swapi - Species:

  - http://localhost:3000/swapi/species/get
