const citiesData = require("../../data/cities.json"); // Reference your cities.json

exports.handler = async function (event, context) {
  try {
    // Return all cities as a response with CORS headers
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins or specify your frontend's URL for production
        "Access-Control-Allow-Methods": "GET, POST, DELETE", // Allow methods you need
        "Access-Control-Allow-Headers": "Content-Type", // Allow the necessary headers
      },
      body: JSON.stringify(citiesData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins or specify your frontend's URL for production
      },
      body: JSON.stringify({ message: "Error loading cities" }),
    };
  }
};
