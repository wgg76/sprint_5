import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig.mjs";
import countryRoutes from "./routes/countryRoutes.mjs"; 
import { fileURLToPath } from "url";
import methodOverride from "method-override";




dotenv.config();

const app = express();









// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware para permitir PUT y DELETE desde formularios
app.use(methodOverride("_method"));

// Configuración de vistas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Conexión a la base de datos
connectDB();

app.use("/api", countryRoutes);


// Uso de rutas
app.use("/", countryRoutes);

app.get("/", (req, res) => {
    res.render("home"); // Renderiza la vista 'home.ejs'
});

app.get("/add-country", (req, res) => {
    res.render("addPais", { formData: {}, errorMessage: null });
});



// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
