// import jwt from ‘jsonwebtoken’; // Import per a la gestió de tokens JWT, si és necessari per a l'autenticació o altres funcionalitats relacionades amb els usuaris.
import Note from "../db/models/note.schema.js"; // Importa el model de Mongoose per a les notes, que es defineix en el fitxer 'note.schema.js'.

// Codi del controlador per a la gestió de les notes.

// Funció per a crear una nova nota, associada a l'usuari autenticat. Aquesta funció utilitza les dades rebudes al cos de la petició i 
// l'identificador de l'usuari per crear i desar la nota a la base de dades, retornant una resposta JSON amb el resultat de l'operació.
const createNote = async (req, res) => {
    try {
        // Crea una nova nota utilitzant les dades rebudes al cos de la petició (body) i l'identificador de l'usuari autenticat (req.user._id).
        const { title, body, state } = req.body; // Desestructura les dades del cos de la petició per a una millor llegibilitat i manteniment del codi.

        console.log(req)
        // Desa la nova nota a la base de dades.
        const novaNota = new Note({
            title, // Títol de la nota, rebut del cos de la petició.
            body, // Contingut de la nota, rebut del cos de la petició.
            state: state || 'Draft', // Estat de la nota, rebut del cos de la petició o establert com a 'Draft' per defecte.
            author: req.user._id, //TODO: FIX THIS // Assigna l'identificador de l'usuari autenticat com a autor de la nota. Prove del authMiddleware.
        });

        await novaNota.save(); // Desa la nota a la base de dades.

        // Retorna una resposta JSON confirmant la creació de la nota, incloent les dades de la nota creada.
        res.status(201).json({ message: 'Nota creada amb èxit', note: novaNota });
    } catch (error) {
        console.error('Error Detallat:', error);
        // Gestiona els errors retornant un JSON amb el missatge d'error.
        res.status(500).json({ error: 'Error al crear la nota', details: error.message });
    }
};

// Funció per llistar les notes de l'usuari autenticat. Aquesta funció consulta la base de dades per obtenir totes les notes associades 
// a l'identificador de l'usuari i retorna una resposta JSON amb les notes trobades.
const listNotes = async (req, res) => {
    try {
        // Consulta la base de dades per obtenir totes les notes associades a l'identificador de l'usuari autenticat (req.user._id).
        const notes = await Note.find({ author: req.user._id }); // Prove del authMiddleware.

        // Retorna una resposta JSON amb les notes trobades.
        res.status(200).json({ notes });
    } catch (error) {
        // Gestiona els errors retornant un JSON amb el missatge d'error.
        res.status(500).json({ error: 'Error al llistar les notes' });
    }
};

// Funció per a actualitzar una nota existent. Aquesta funció rep l'identificador de la nota a través dels paràmetres de la ruta i les 
// dades al cos de la petició, i actualitza la nota a la base de dades, retornant una resposta JSON amb el resultat de l'operació.
const updateNote = async (req, res) => {
    try {
        const { id } = req.params; // Desestructura l'identificador de la nota dels paràmetres de la ruta.
        const { title, body, state } = req.body; // Desestructura les dades del cos de la petició per a una millor llegibilitat i manteniment del codi.

        // Usa el mètode findOneAndUpdate de Mongoose per a actualitzar la nota, assegurant-se que la nota pertany a l'usuari autenticat (req.user._id)
        // i actualitzant les dades de la nota i la data d'actualització.
        const note = await Note.findOneAndUpdate(
            { _id: id, author: req.user._id }, // Assegura que la nota és de l'usuari autenticat.
            { title, body, state, dataActualitzacio: Date.now() }, // Actualitza les dades de la nota i la data d'actualització.
            { new: true, runValidators: true } // Retorna la nota actualitzada i executa les validacions de l'esquema.
        );

        // Si no es troba la nota, retorna un error 404 amb missatge.
        if (!note) {
            return res.status(404).json({ message: 'Nota no trobada' });
        }

        // Retorna una resposta JSON confirmant l'actualització de la nota, incloent les dades de la nota actualitzada.
        res.status(200).json({ message: 'Nota actualitzada amb èxit', note });
    } catch (error) {
        //Retorna un error 500 si hi ha un problema en l'actualització de la nota.
        res.status(500).json({ message: 'Error en actualitzar la nota', error });
    }
};

// Funció per a eliminar una nota existent. Aquesta funció rep l'identificador de la nota a través dels paràmetres 
// de la ruta i elimina la nota de la base de dades, retornant una resposta JSON amb el resultat de l'operació.
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params; // Desestructura l'identificador de la nota dels paràmetres de la ruta.

        // Usa el mètode findOneAndDelete de Mongoose per a eliminar la nota, assegurant-se que la nota pertany a l'usuari autenticat.
        const note = await Note.findOneAndDelete({
            _id: id, // Identificador de la nota a eliminar.
            author: req.user._id, // Assegura que la nota és de l'usuari autenticat.
        });

        // Si no es troba la nota, retorna un error 404 amb missatge.
        if (!note) {
            return res.status(404).json({ message: 'Nota no trobada' });
        }

        // Retorna una resposta JSON confirmant que la nota s'ha eliminat amb èxit.
        res.status(200).json({ message: 'Nota eliminada amb èxit' });
    } catch (error) {
        // Retorna un error 500 si hi ha un problema en l'eliminació de la nota.
        res.status(500).json({ message: 'Error en eliminar la nota', error });
    }
};

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params; // Desestructura l'identificador de la nota dels paràmetres de la ruta.

        // Usa el mètode findOne de Mongoose per a obtenir la nota, assegurant-se que la nota pertany a l'usuari autenticat.
        const note = await Note.findOne({
            _id: id, // Identificador de la nota a obtenir.
            author: req.user._id, // Assegura que la nota és de l'usuari autenticat.
        });

        // Si no es troba la nota, retorna un error 404 amb missatge.
        if (!note) {
            return res.status(404).json({ message: 'Nota no trobada' });
        }

        // Retorna una resposta JSON amb les dades de la nota trobada.
        res.status(200).json({ note });
    } catch (error) {
        // Retorna un error 500 si hi ha un problema en l'obtenció de la nota.
        res.status(500).json({ message: 'Error en obtenir la nota', error });
    }
};

// Exportar les funcions per a poder-les utilitzar en altres parts de l'aplicació, com ara les rutes.
export { createNote, listNotes, updateNote, deleteNote, getNoteById };