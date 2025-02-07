// netlify/functions/deleteCity.js
const fs = require("fs");
const path = require("path");
const citiesFilePath = path.join(__dirname, "../../data/cities.json");

exports.handler = async function (event, context) {
  if (event.httpMethod === "DELETE") {
    const { id } = event.queryStringParameters; // Get the city ID from the query params

    try {
      const citiesData = JSON.parse(fs.readFileSync(citiesFilePath));

      // Filter out the city by ID
      const updatedCities = citiesData.cities.filter(
        (city) => city.id !== parseInt(id)
      );

      // Save the updated list back to the file
      fs.writeFileSync(
        citiesFilePath,
        JSON.stringify({ cities: updatedCities })
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ id }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error deleting city" }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
  };
};
