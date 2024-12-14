import mongoose from "mongoose";

const paisSchema = new mongoose.Schema({
  name: {
      common: String,
      official: String,
      spa: { // Agregamos el campo spa explícitamente
          official: String,
          common: String,
      },
      nativeName: Object,
  },
  independent: Boolean,
  status: String,
  unMember: Boolean,
  capital: [String],
  region: String,
  subregion: String,
  languages: Object,
  latlng: [Number],
  landlocked: Boolean,
  borders: {
    type: [String],
    validate: {
        validator: function (borders) {
            return borders.every(border => /^[A-Z]{3}$/.test(border));
        },
        message: "Cada frontera debe ser un código de tres letras en mayúsculas.",
    },
    required: true, // Cambia a true si es obligatorio
  },
  area: Number,
  flag: String,
  population: Number,
  timezones: [String],
  creador: {
      type: String,
  },
}, { collection: 'Grupo-07' });

const Pais = mongoose.model('Pais', paisSchema);

export default Pais;
