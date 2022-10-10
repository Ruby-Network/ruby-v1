import createServer from "@tomphttp/bare-server-node";
import http from "http";
import serveStatic from "serve-static";
import { publicPath } from "wc-static";
import uvPath from "@unblocked-haven/ultraviolet";

const bare = createServer("/bare/");
const serve = serveStatic(publicPath, { fallthrough: false });
const serveUV = serveStatic(uvPath, { fallthrough: false });
const server = http.createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    if (req.url.startsWith("/uv/")) {
      req.url = req.url.slice("/uv".length);
      serveUV(req, res, (err) => {
        res.writeHead(err?.statusCode || 500, null, {
          "Content-Type": "text/plain",
        });
        res.end(err?.stack);
      });
    } else {
      serve(req, res, (err) => {
        res.writeHead(err?.statusCode || 500, null, {
          "Content-Type": "text/plain",
        });
        res.end(err?.stack);
      });
    }
  }
});
server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req, socket, head)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});
let port = parseInt(process.env.PORT || "8080");
server.on("listening", () => {
  const address = server.address();

  console.log(
    `Listening on http://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});
server.listen({
  port,
});
