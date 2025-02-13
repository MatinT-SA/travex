import fs from "fs";
import path from "path";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const filePath = path.join(process.cwd(), "data", "cities.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const cities = JSON.parse(data);

    if (req.method === "GET") {
      res.status(200).json(cities);
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const newCity = JSON.parse(body);
        cities.push(newCity);

        fs.writeFileSync(filePath, JSON.stringify(cities, null, 2));
        res
          .status(201)
          .json({ message: "City added successfully", city: newCity });
      });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to load cities data" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
