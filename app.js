const { createServer } = require("node:http");
const os = require("os");

// Generate random delay
const getRandomDelay = () => {
  return Math.floor(Math.random() * 1000) + 500; // Random delay between 500ms and 1500ms
};

const handleReq = (req, res) => {
  setTimeout(() => {
    const cpuInfo = os.cpus();
    const osInfo = {
      platform: os.platform(),
      release: os.release(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
    };

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    if (req.method === "GET" && req.url === "/info") {
      res.end(JSON.stringify({ cpu: cpuInfo, os: osInfo }));
    } else if (req.method === "GET" && req.url === "/cpu") {
      res.end(JSON.stringify({ cpu: cpuInfo }));
    } else if (req.method === "GET" && req.url === "/os") {
      res.end(JSON.stringify({ os: osInfo }));
    } else {
      // Handle other requests with 404 Not Found
      res.writeHead(404);
      res.end("404 Not Found");
    }
  }, getRandomDelay());
};

// Create a server instance
const server = createServer((req, res) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    });
    res.end();
    return;
  }

  handleReq(req, res);
});

// Start the server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
