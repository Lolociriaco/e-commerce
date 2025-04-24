# Description

## Correr en dev

  1. Clonar el repositorio
  2. Crear una copia del .env.template y renombrarlo a .env y cambiar las variables de entorno (.env no se sube al repositorio, por eso subo .env.template).
  3. Instalar dependencias ``npm install``
  4. Levantar la base de datos ``docker compose up -d``
  5. Correr las migraciones de prisma con ``npx prisma migrate dev``
  6. Ejecutar el script del seed ``npx run seed``
  7. Correr el poryecto ``npm run dev``

## Correr en prod