# JavaScript-API

Aplicación full-stack basada en el stack MEN (MongoDB, Express, Node.js) con un frontend en Next.js.

## Estructura del proyecto

- [men-app/](men-app/) — API REST en Express + MongoDB (Mongoose).
- [frontend/](frontend/) — Aplicación Next.js (React 19 + Tailwind).
- [docker-compose.yml](docker-compose.yml) — Levanta MongoDB y la API en contenedores.

## Requisitos previos

- [Docker](https://www.docker.com/) y Docker Compose.
- [Node.js](https://nodejs.org/) 18 o superior (para ejecutar el frontend en local).

## Configuración

Las variables de entorno se leen desde el archivo [.env](.env) en la raíz del proyecto. Valores por defecto:

| Variable             | Valor por defecto |
| -------------------- | ----------------- |
| `MONGO_ROOT_USER`    | `menapiuser`      |
| `MONGO_ROOT_PASSWORD`| `menapiuser`      |
| `MONGO_DATABASE`     | `men-app`         |
| `MONGO_LOCAL_PORT`   | `27017`           |
| `NODE_LOCAL_PORT`    | `3000`            |
| `NODE_DOCKER_PORT`   | `3000`            |

## Ejecutar la app

### 1. Backend + base de datos (Docker)

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Esto levanta:

- **MongoDB** en `localhost:27017`
- **API Express** en `http://localhost:3000`

Para detener los contenedores:

```bash
docker compose down
```

### 2. Frontend (Next.js)

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend queda disponible en `http://localhost:3001`.

## Scripts disponibles

### Backend ([men-app/](men-app/))

- `npm start` — arranca el servidor con `nodemon` (recarga en caliente).

### Frontend ([frontend/](frontend/))

- `npm run dev` — modo desarrollo en el puerto 3001.
- `npm run build` — build de producción.
- `npm start` — sirve el build de producción.
- `npm run lint` — ejecuta ESLint.

## Comprobar que funciona

Con la API levantada, una petición GET a la raíz debe responder con un mensaje de confirmación:

```bash
curl http://localhost:3000/
# → Petició GET rebuda a la ruta arrel
```
