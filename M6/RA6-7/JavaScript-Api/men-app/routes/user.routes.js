import express from 'express';
const router = express.Router();

// Importa els controladors
import { loginUser, registerUser, logoutUser, getProfile } from '../controllers/user.controller.js';
// Importa el middleware per protegir les rutes privades.
import authMiddleware from '../middlewares/auth.middleware.js';

// Ruta per a l'autenticació d'usuaris (Login).
router.post('/login', loginUser);


// Ruta per a la creació de nous usuaris (Register).
router.post('/register', registerUser);


// Ruta per tancar la sessió (Logout).
router.post('/logout', authMiddleware, logoutUser);

// Ruta per obtenir el perfil de l'usuari autenticat.
router.get('/profile', authMiddleware, getProfile);



// Exporta el router per defecte perquè pugui ser utilitzat a l'arxiu principal.
export default router;

