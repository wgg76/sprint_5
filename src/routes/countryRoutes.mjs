import express from "express";
import {
    createCountryController,
    getCountriesController,
    loadSpanishSpeakingCountriesController,
    updateCountryController,
    deleteCountryController,
} from "../controllers/countryController.mjs";
import Country from "../models/country.mjs";


const router = express.Router();

// Obtener todos los países creados por "Walter"
router.get("/countries", getCountriesController);

router.get("/edit-country/:id", async (req, res) => {
    try {
        const country = await Country.findById(req.params.id); // Obtén el país por su ID
        if (!country) {
            return res.status(404).send("País no encontrado.");
        }
        res.render("editPais", { country }); // Renderiza la vista de edición con los datos del país
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición.");
    }
});

router.delete("/countries/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCountry = await Country.findByIdAndDelete(id);

        if (!deletedCountry) {
            return res.status(404).send("País no encontrado.");
        }

        res.redirect("/countries"); // Redirige al dashboard después de eliminar
    } catch (error) {
        console.error("Error al eliminar el país:", error);
        res.status(500).send("Error al eliminar el país.");
    }
});




// Crear un nuevo país
router.post("/countries", createCountryController);

// Cargar y guardar países que hablan español
router.post("/countries/load-spanish-speaking", loadSpanishSpeakingCountriesController);

// Actualizar un país por ID
router.put("/countries/:id", updateCountryController);

// Eliminar un país por ID
router.delete("/countries/:id", deleteCountryController);

export default router;

