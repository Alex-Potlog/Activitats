import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/connection.js';
import userRoutes from './routes/user.routes.js';

//Importar les rutes de les notes.
import notesRoutes from './routes/note.routes.js';

// Importa el fitxer de connexió a la base de dades perquè s'executi.

connectDB();

// Importa les rutes

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Comprova que el servidor està responent correctament
app.get('/', (req, res) => {
  // Resposta que s'envia al client
  res.send('Petició GET rebuda a la ruta arrel');
});

// Configura els punts d'entrada de les rutes:
// Les rutes d'usuaris han de penjar de '/users'.
// Les rutes de notes han de penjar de '/notes'.
app.use('/users', userRoutes);
app.use('/notes', notesRoutes);

// Defineix el port del servidor a partir de la variable d'entorn NODE_DOCKER_PORT.

// Aixeca el servidor i mostra un missatge per consola indicant que s'està executant i en quin port.
app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`Server is running on port ${process.env.NODE_DOCKER_PORT}.`);
});