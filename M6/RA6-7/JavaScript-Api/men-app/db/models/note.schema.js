import mongoose from 'mongoose';

// Aquest codi defineix un esquema de Mongoose per a una col·lecció de notes, amb camps com 'title', 'body', 'state', 'author', 
// 'dataCreacio' i 'dataActualitzacio'. El model es denomina 'Note' i es pot utilitzar per interactuar amb la base de dades MongoDB.

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        enum: ['Published', 'Draft', 'Archived'],
        default: 'Draft',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //Aquest nom ha de coincidir amb el nom del model d'usuari
        required: true,
    },
    dataCreacio: {
        type: Date,
        default: Date.now,
    },
    dataActualitzacio: {
        type: Date,
        default: Date.now,
    },
});

// Exporta el model de Mongoose anomenat 'Note' utilitzant l'esquema definit.
export default mongoose.model('Note', noteSchema);

// Una altra forma de exportar el model seria:
// const Note = mongoose.model('Note', noteSchema);
// export default Note;