import { getAllCountries, getCountryById, createCountry, updateCountry, deleteCountry } from "../repositories/countryRepository.js";
import { API_BASE_URL } from "../config/apiConfig.js";
import axios from "axios";


export const fetchSpanishSpeakingCountries = async () => {
    const response = await axios.get(API_BASE_URL);
    const countries = response.data;

    console.log("Datos obtenidos de la API:", countries); // Verifica los datos aquí

    // Filtrar países que hablan español
    return countries.filter(country => country.languages && country.languages.spa);
};


// Obtener todos los países
export const getAllCountriesService = async () => {
    try {
        const countries = await getAllCountries(); // Llama al repositorio para obtener todos los países
        return countries;
    } catch (error) {
        throw new Error("Error al obtener los países");
    }
};

// Crear un nuevo país
export const createCountryService = async (countryData) => {
    try {
        const country = await createCountry(countryData); // Llama al repositorio para crear un país
        return country;
    } catch (error) {
        throw new Error("Error al crear el país");
    }
};

// Actualizar un país existente
export const updateCountryService = async (id, countryData) => {
    try {
        const updatedCountry = await updateCountry(id, countryData); // Llama al repositorio para actualizar el país
        return updatedCountry;
    } catch (error) {
        throw new Error("Error al actualizar el país");
    }
};

// Eliminar un país
export const deleteCountryService = async (id) => {
    try {
        const deletedCountry = await deleteCountry(id); // Llama al repositorio para eliminar un país
        return deletedCountry;
    } catch (error) {
        throw new Error("Error al eliminar el país");
    }
};
