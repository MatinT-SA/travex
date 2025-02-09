import jsonServer from "json-server";
import { createServer } from "http";
import { parse } from "url";
import path from "path";
import { fileURLToPath } from "url";

// Needed to handle ES module paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = jsonServer.create();
const router = jsonServer.router(
  path.join(__dirname, "../../public/cities.json")
);
const middlewares = jsonServer.defaults();

// Enable CORS
server.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://travex-application.vercel.app"
  ); // Allow all origins (or change to specific domain like 'https://your-domain.com')
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS"); // Allow necessary methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow Content-Type and Authorization headers
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (optional, if your API needs it)

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Handle preflight requests
  }

  next(); // Proceed to JSON Server
});

server.use(middlewares);
server.use(router);

export default function handler(req, res) {
  const parsedUrl = parse(req.url, true);
  server.handle(req, res, parsedUrl);
}

export const config = {
  api: {
    bodyParser: false, // Required for JSON Server to work properly
  },
};
