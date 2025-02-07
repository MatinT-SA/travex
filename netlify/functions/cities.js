// netlify/functions/cities.js
const citiesData = require("../../data/cities.json"); // Reference your cities.json

exports.handler = async function (event, context) {
  try {
    // Return all cities as a response
    return {
      statusCode: 200,
      body: JSON.stringify(citiesData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error loading cities" }),
    };
  }
};
