"use strict";

const fastify = require("fastify")({ logger: false });
const path = require("path");

fastify.register(require("fastify-cors"), {
  origin: "*",
});

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

// Uri routes
fastify.register(require("./spotify/login"));
fastify.register(require("./spotify/callback"));
fastify.register(require("./spotify/play"));
fastify.register(require("./spotify/pause"));

// Run the server!
const start = async () => {
  try {
    await fastify.listen(8888);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
