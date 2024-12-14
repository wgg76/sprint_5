import Country from "../models/country.mjs"; // Importamos el modelo Country

// Función para obtener todos los países
export const getAllCountries = async () => {
    try {
        const countries = await Country.find(); // Obtiene todos los países
        return countries;
    } catch (error) {
        throw new Error("Error al obtener los países.");
    }
};

// Función para obtener países creados por Walter
export const getCountriesByCreator = async (creator) => {
    try {
        const countries = await Country.find({ creador: creator }); // Filtra por creador
        return countries;
    } catch (error) {
        throw new Error("Error al obtener los países de Walter.");
    }
};

// Función para obtener un país por su ID
export const getCountryById = async (id) => {
    try {
        const country = await Country.findById(id); // Busca un país por su ID
        if (!country) {
            throw new Error("País no encontrado.");
        }
        return country;
    } catch (error) {
        throw new Error("Error al obtener el país.");
    }
};

// Función para crear un nuevo país
export const createCountry = async (countryData) => {
    try {
        const newCountry = new Country(countryData); // Crea una nueva instancia del país
        await newCountry.save(); // Guarda el nuevo país en la base de datos
        return newCountry;
    } catch (error) {
        throw new Error("Error al agregar el país.");
    }
};

// Función para actualizar un país por su ID
export const updateCountry = async (id, updatedData) => {
    try {
        const updatedCountry = await Country.findByIdAndUpdate(
            mongoose.Types.ObjectId(id),
            updatedData,
            { new: true, runValidators: true }
        );
        return updatedCountry;
    } catch (error) {
        console.error("Error al actualizar el país en el repositorio:", error);
        throw error;
    }
};


export const updateCountryByName = async (commonName, countryData) => {
    try {
        const updatedCountry = await Country.findOneAndUpdate(
            { "name.common": commonName }, // Busca por nombre común
            countryData, // Nuevos datos
            { new: true } // Devuelve el documento actualizado
        );
        if (!updatedCountry) {
            throw new Error("País no encontrado para actualizar.");
        }
        return updatedCountry;
    } catch (error) {
        throw new Error("Error al actualizar el país.");
    }
};



// Función para eliminar un país por su ID
export const deleteCountry = async (id) => {
    try {
        const deletedCountry = await Country.findByIdAndDelete(id); // Elimina el país
        if (!deletedCountry) {
            throw new Error("País no encontrado para eliminar.");
        }
        return deletedCountry;
    } catch (error) {
        throw new Error("Error al eliminar el país.");
    }
};
