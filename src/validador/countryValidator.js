const validateCountryData = (data) => {
  // Validación del nombre del país
  if (!data.name || typeof data.name !== "string") {
      throw new Error("Invalid country name");
  }

  // Validación de la capital del país
  if (!data.capital || typeof data.capital !== "string") {
      throw new Error("Invalid country capital");
  }

  // Validación de la región del país
  if (!data.region || typeof data.region !== "string") {
      throw new Error("Invalid country region");
  }

  // Validación de la población
  if (!data.population || typeof data.population !== "number") {
      throw new Error("Invalid country population");
  }

  // Validación del área
  if (!data.area || typeof data.area !== "number") {
      throw new Error("Invalid country area");
  }

  // Validación de las fronteras (debe ser un array de 3 letras, mayúsculas)
  if (data.borders) {
      if (!Array.isArray(data.borders)) {
          throw new Error("Invalid borders array");
      }
      data.borders.forEach(border => {
          if (typeof border !== "string" || border.length !== 3 || !/^[A-Z]{3}$/.test(border)) {
              throw new Error("Invalid border code. Each border must be a 3-letter uppercase string.");
          }
      });
  }

  // Validación de las zonas horarias (debe ser un array)
  if (data.timezones && !Array.isArray(data.timezones)) {
      throw new Error("Invalid timezones array");
  }

  // Validación del campo 'creador'
  if (!data.creador || typeof data.creador !== "string") {
      throw new Error("Invalid creator field");
  }
};

module.exports = { validateCountryData};
