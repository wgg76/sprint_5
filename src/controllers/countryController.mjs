import { getAllCountries, createCountry, updateCountry, deleteCountry } from "../repositories/countryRepository.js";
import axios from 'axios'; // Asegúrate de importar axios
import { API_BASE_URL } from '../config/apiConfig.js'; // Ahora esta importación debería funcionar
import Country from "../models/country.mjs"; // Asegúrate de que la ruta sea correcta


import { fetchSpanishSpeakingCountries } from "../services/countryService.mjs"; // Asegúrate de tener esta función en tu servicio



import Pais from '../models/country.mjs'; // Modelo de País
import mongoose from 'mongoose'; // Para manejar ObjectId

export const getCountriesController = async (req, res) => {
    try {
        const countries = await Country.find({ creador: "Walter" });

        const formattedCountries = countries.map(country => ({
            nameOfficialSpa: country.name?.spa?.official || "N/A", // Extraemos el nombre oficial en español
            capital: Array.isArray(country.capital) && country.capital.length ? country.capital : ["N/A"],
            region: country.region || "N/A",
            population: country.population || "N/A",
            area: country.area || "N/A",
            borders: Array.isArray(country.borders) && country.borders.length ? country.borders : ["N/A"],
            timezones: Array.isArray(country.timezones) && country.timezones.length ? country.timezones : ["N/A"],
            creador: country.creador || "N/A",
            _id: country._id,
        }));

        console.log(formattedCountries); // Para verificar los datos procesados en el servidor
        res.render("dashboard", { countries: formattedCountries });
    } catch (error) {
        console.error("Error al obtener los países:", error);
        res.status(500).send("Error al cargar los países.");
    }
};



export const createCountryController = async (req, res) => {
    try {
        const bordersArray = req.body.borders
            .split(",")
            .map(border => border.trim().toUpperCase());

        if (bordersArray.some(border => !/^[A-Z]{3}$/.test(border))) {
            // Renderizar el formulario con los datos ingresados y un mensaje de error
            return res.status(400).render("addPais", {
                formData: req.body,
                errorMessage: "Las fronteras deben ser códigos de tres letras en mayúsculas.",
            });
        }

        const countryData = {
            name: {
                common: req.body.name,
                official: req.body.official,
                spa: {
                    official: req.body.spaOfficial || "N/A",
                    common: req.body.spaCommon || "N/A",
                },
            },
            capital: req.body.capital.split(",").map(cap => cap.trim()),
            region: req.body.region,
            population: parseInt(req.body.population, 10),
            area: parseFloat(req.body.area),
            borders: bordersArray,
            timezones: req.body.timezones.split(",").map(tz => tz.trim()),
            creador: "Walter",
        };

        await createCountry(countryData); // Llamada al repositorio o modelo
        res.redirect("/countries"); // Redirigir al dashboard después de agregar
    } catch (error) {
        console.error("Error al agregar el país:", error);
        res.status(500).send("Error al agregar el país.");
    }
};




// Agregar un nuevo país

export const loadSpanishSpeakingCountriesController = async (req, res) => {
    try {
        const spanishSpeakingCountries = await fetchSpanishSpeakingCountries();
        const savedCountries = [];

        for (const country of spanishSpeakingCountries) {
            const countryData = {
                name: {
                    common: country.name.common,
                    official: country.name.official,
                    spa: {
                        official: country.translations?.spa?.official || "N/A",
                    },
                },
                cca2: country.cca2 || "N/A",
                ccn3: country.ccn3 || "N/A",
                cca3: country.cca3 || "N/A",
                capital: country.capital || ["N/A"],
                region: country.region || "Desconocido",
                population: country.population || 0,
                area: country.area || 0,
                landlocked: country.landlocked || false,
                borders: country.borders || [],
                timezones: country.timezones || [],
                languages: country.languages || {}, // Asegurarse de que siempre sea un objeto
                creador: "Walter",
            };

            try {
                const newCountry = await createCountry(countryData); // Llama a la función del repositorio
                savedCountries.push(newCountry);
            } catch (error) {
                console.error("Error al guardar el país:", country.name?.common, error.message);
            }
        }

        res.status(201).json({ message: "Países que hablan español guardados exitosamente.", countries: savedCountries });
    } catch (error) {
        console.error("Error al cargar los países:", error);
        res.status(500).json({ message: "Error al cargar los países." });
    }
};


export const updateCountryController = async (req, res) => {
    try {
        const { id } = req.params;

        const bordersArray = req.body.borders
            .split(",")
            .map(border => border.trim().toUpperCase());

        if (bordersArray.some(border => !/^[A-Z]{3}$/.test(border))) {
            return res.status(400).send("Las fronteras deben ser códigos de tres letras en mayúsculas.");
        }

        const updatedCountry = {
            name: {
                common: req.body.name,
                official: req.body.official,
                spa: {
                    official: req.body.spaOfficial,
                    common: req.body.spaCommon || "N/A",
                },
            },
            capital: req.body.capital.split(",").map(cap => cap.trim()),
            region: req.body.region,
            population: parseInt(req.body.population, 10),
            area: parseFloat(req.body.area),
            borders: bordersArray,
            timezones: req.body.timezones.split(",").map(tz => tz.trim()),
        };

        const country = await Country.findByIdAndUpdate(id, updatedCountry, { new: true });
        res.redirect("/countries");
    } catch (error) {
        console.error("Error al actualizar el país:", error);
        res.status(500).send("Error al actualizar el país.");
    }
};







// Eliminar un país
export const deleteCountryController = async (req, res) => {
    try {
        const { id } = req.params;  // Obtiene el ID del país a eliminar
        const country = await deleteCountry(id);  // Llama al repositorio para eliminar el país

        if (!country) {
            return res.status(404).json({ message: "País no encontrado." });  // Si no encuentra el país
        }

        res.status(200).json({ message: "País eliminado exitosamente." });  // Responde con éxito
    } catch (error) {
        console.error("Error al eliminar el país:", error);
        res.status(500).json({ message: "Error al eliminar el país." });  // En caso de error
    }
};


