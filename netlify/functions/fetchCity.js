// netlify/functions/fetchCity.js
const citiesData = require("../../data/cities.json"); // Reference your cities.json

exports.handler = async function (event, context) {
  const { id } = event.queryStringParameters; // Get city ID from query params

  try {
    const city = citiesData.cities.find((c) => c.id === parseInt(id));

    if (!city) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "City not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(city),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching city" }),
    };
  }
};
