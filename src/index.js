import createBareServer from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "node:http";
import { publicPath } from "ruby-static";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { join } from "node:path";
import { hostname } from "node:os";
const blocklist = [
  "now.gg",
  "www.now.gg"
]

const bare = createBareServer("/bare/");
const app = express();

// Load our publicPath first and prioritize it over UV.
app.use(express.static(publicPath));
// Load vendor files last.
// The vendor's uv.config.js won't conflict with our uv.config.js inside the publicPath directory.
app.use("/uv/", express.static(uvPath));

app.get("/suggest", (req, res) => {
  // Get the search query from the query string
  const query = req.query.q;

  // Make a request to the Brave API
  fetch(`https://search.brave.com/api/suggest?q=${encodeURIComponent(query)}&format=json`)
    .then((response) => response.json())
    .then((data) => {
      // Send the response data back to the browser
      res.json(data);
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
      res.sendStatus(500);
    });
});

app.get("/barePath", (req, res) => {
    res.set("Content-Type", "application/xhtml+xml");
    // fetch localstorage data and add it to a div
    res.send(`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
        <head>
            <title>Hello world</title>
        </head>
    
        <body>
            <div id="data"></div>
            <script>
                const data = localStorage.getItem("barePath");
                document.getElementById("data").innerHTML = data;
            </script>
        </body>
    </html>
    `);
    res.end();
});
// Error for everything else
app.use((req, res) => {
  res.status(404);
  res.sendFile(join(publicPath, "404.html"));
});

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.on("listening", () => {
  const address = server.address();

  // by default we are listening on 0.0.0.0 (every interface)
  // we just need to list a few
  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

server.listen({
  port,
});
