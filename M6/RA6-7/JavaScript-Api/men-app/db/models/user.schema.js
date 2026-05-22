import mongoose from "mongoose";
const { Schema, model } = mongoose;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

// Defineix l'esquema d'usuari (userSchema).
const userSchema = new Schema(
  {
    // Camp 'name': ha de ser de tipus String.
    name: {
      type: String,
      required: [true, 'El nom és obligatori']
    },

    // Camp 'surname': ha de ser String i obligatori amb un missatge personalitzat.
    surname: {
      type: String,
      required: [true, 'El cognom és obligatori']
    },

    // Camp 'email': ha de ser String, obligatori i únic.
    // Afegeix una validació personalitzada (validate) que utilitzi una expressió regular
    // per comprovar que el format del correu és correcte.
    email: {
      type: String,
      required: [true, 'El correu electrònic és obligatori'],
      unique: true,
      validate: {
        validator: (value) => {
          return emailRegex.test(value);
        },
        message: 'El format del correu no és correcte'
      },
    },

    // Camp 'password': ha de ser String i obligatori.
    // Afegeix una validació personalitzada que comprovi que la contrasenya té:
    // Almenys 8 caràcters, una majúscula, una minúscula, un número i un símbol.
    password: {
      type: String,
      required: [true, 'La contrasenya és obligatòria'],
      validate: {
        validator: function(value) {
          return passwordRegex.test(value);
        },
        message: 'La contrasenya ha de tenir mínim 8 caràcters, una majúscula, una minúscula, un número i un símbol'
      },
    },
  },
  { 
    // Configura l'opció timestamps per gestionar automàticament 'createdAt' i 'updatedAt'.
    timestamps: true
  }
);

// Exporta el model de Mongoose anomenat 'User' utilitzant l'esquema definit.
export default model('User', userSchema);