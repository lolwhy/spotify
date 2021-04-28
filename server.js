const fastify = require('fastify')({ logger: false });
const path = require('path');

fastify.register(require('fastify-cors'), {
  origin: '*',
});

// To server the /public html files (e.g. index.html)
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/',
});

fastify.get('/main', (req, reply) => reply.sendFile('mainPage.html'));

// Uri routes
fastify.register(require('./spotify/login'));
fastify.register(require('./spotify/callback'));
fastify.register(require('./spotify/play'));
fastify.register(require('./spotify/pause'));
fastify.register(require('./spotify/add_to_queue'));
fastify.register(require('./spotify/info'));

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 8888, process.env.HOST || '::');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
