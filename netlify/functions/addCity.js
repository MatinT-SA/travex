// netlify/functions/addCity.js
const fs = require("fs");
const path = require("path");
const citiesFilePath = path.join(__dirname, "../../data/cities.json");

exports.handler = async function (event, context) {
  if (event.httpMethod === "POST") {
    try {
      const newCity = JSON.parse(event.body); // Get the new city data from the request body

      // Read existing cities from the JSON file
      const citiesData = JSON.parse(fs.readFileSync(citiesFilePath));

      // Add the new city to the cities array
      citiesData.cities.push(newCity);

      // Save the updated cities data back to the file
      fs.writeFileSync(citiesFilePath, JSON.stringify(citiesData));

      return {
        statusCode: 200,
        body: JSON.stringify(newCity),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error adding city" }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
  };
};
