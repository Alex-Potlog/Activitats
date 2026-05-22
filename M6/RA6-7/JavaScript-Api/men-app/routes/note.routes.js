import express from "express"; // Importa el framework Express per a la creació de rutes i gestió de peticions HTTP.
// Importa les funcions del controlador de notes, que gestionen la lògica de negoci per a les operacions CRUD de les notes.
import { createNote, listNotes, updateNote, deleteNote, getNoteById } from "../controllers/note.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js"; // Importa el middleware d'autenticació per a protegir les rutes que requereixen autenticació.

//Crear l'objecte router per a definir les rutes relacionades amb les notes.
const router = express.Router();

// Creem les rutes, protegint-les amb el middleware d'autenticació (authMiddleware) per assegurar que només els usuaris autenticats puguin accedir a aquestes rutes.
router.post('', authMiddleware, createNote); // Ruta per a crear una nova nota, protegida per autenticació.
router.get('', authMiddleware, listNotes); // Ruta per a llistar les notes de l'usuari autenticat, protegida per autenticació.
router.put('/:id', authMiddleware, updateNote); // Ruta per a actualitzar una nota existent, protegida per autenticació.
router.delete('/:id', authMiddleware, deleteNote); // Ruta per a eliminar una nota existent, protegida per autenticació. 
router.get('/:id', authMiddleware, getNoteById); // Ruta per a obtenir una nota específica pel seu ID, protegida per autenticació.

//Exportar el router
export default router;