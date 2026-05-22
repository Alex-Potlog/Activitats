import bcrypt from 'bcryptjs';
import User from '../db/models/user.schema.js';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
    try {

        // Recupera l'email i la password del cos de la petició (body).
        const { email: mail, password } = req.body;

        // Valida que l'email tingui un format correcte i la password compleixi els requisits
        // (mínim 8 caràcters, lletres majúscules, minúscules, números i símbols) mitjançant Regex.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

        if (!emailRegex.test(mail)) {
            return res.status(400).json({ message: 'Introdueix un mail correcte' });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'La contrasenya ha de tenir mínim 8 caràcters, una majúscula, una minúscula, un número i un símbol',
            });
        }

        // Cerca l'usuari a la base de dades pel seu email.
        // Si l'usuari no existeix, llança una excepció informant que no està registrat.
        const existeix = await User.findOne({ email: mail });

        if (!existeix) {
            return res.status(400).json({
                message:"No hi ha cap compte creat per a aques email"
            })
        }


        // Crea un objecte 'profile' amb les dades de l'usuari (_id, name, surname, email).
        const { _id, name, surname, email } = existeix;
        const profile = { _id, name, surname, email };



        // Genera un token JWT signat amb el perfil de l'usuari, una clau secreta de les 
        // variables d'entorn i una durada d'un dia.
        const token = jwt.sign(profile, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Compara la password rebuda amb la password encriptada de la base de dades usant bcrypt.
        // Si no coincideixen, llança una excepció d'error d'autenticació.
        const passwordMatch = await bcrypt.compare(password, existeix.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credencials invàlides' });
        }

        // Si tot és correcte, configura una cookie anomenada 'jwt' amb el token.
        // La cookie ha de ser httpOnly, segura, amb sameSite 'lax' i una caducitat de 24 hores.
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hores en mil·lisegons
        });

        // Retorna una resposta JSON confirmant l'autenticació.
        return res.status(200).json({ message: 'Login correcte', profile, token });

    } catch (error) {
        // Gestiona els errors retornant un JSON amb el missatge d'error.
        return res.status(500).json({
            message: 'Error en el procés de login',
            error: error.message,
        });
    }
};

async function registerUser(req, res) {
    try {
        // Crea una nova instància del model User amb les dades rebudes al body.
        const { name, surname, email: mail, password } = req.body;


        // Valida les dades de l'usuari sincronament segons l'esquema de Mongoose.
        // UTilitzando el mètode validateSync() de Mongoose, 
        // Captura els errors de validació i retorna un JSON amb els missatges d'error per a cada camp.
        const usuari = new User({ name, surname, email: mail, password });
        const validationError = usuari.validateSync();

        if (validationError) {
            const errors = {};

            for (const field in validationError.errors) {
                errors[field] = validationError.errors[field].message;
            }

            return res.status(400).json({ errors });
        }

        // Comprova si ja existeix un usuari amb el mateix correu electrònic.
        // Si existeix, llança un error indicant que l'usuari ja està registrat.
        const existeix = await User.findOne({ email: mail });

        if (existeix) {
            return res.status(400).json({
                message: 'Aquest correu ja està registrat'
            });
        }

        // Encripta la contrasenya de l'usuari amb bcrypt (10 salts).
        const salts = 10;
        const hashedPassword = await bcrypt.hash(password, salts);
        usuari.password = hashedPassword;

        // Desa el nou usuari a la base de dades.
        await usuari.save();

        // Retorna una resposta JSON confirmant la creació del compte.
        return res.status(201).json({ message: 'Compte creat correctament' });

    } catch (error) {
        // Si l'error és de validació de Mongoose (ValidationError), retorna un status 400 
        // amb un objecte que contingui els missatges d'error per a cada camp.
        if (error.name === 'ValidationError') {
            const errors = {};

            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }

            return res.status(400).json({ errors });
        }

        // Per a altres errors, retorna un status 500.
        return res.status(500).json({ message: 'Error intern del servidor' });
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Usuari no trobat' });
        }

        const { _id, name, surname, email } = user;
        return res.status(200).json({ profile: { _id, name, surname, email } });
    } catch (error) {
        return res.status(500).json({
            message: 'Error en obtenir el perfil',
            error: error.message,
        });
    }
};

const logoutUser = async (req, res) => {
    // Esborra la cookie 'jwt' configurant les mateixes opcions (httpOnly, sameSite, secure).
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    });
    
    // Retorna un missatge confirmant el tancament de la sessió.
    return res.status(200).json({ message: 'Sessió tancada correctament' });
};




// Exporta totes les funcions per poder-les utilitzar en el fitxer de rutes.
export { loginUser, registerUser, logoutUser, getProfile };