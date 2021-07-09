const Hapi = require('@hapi/hapi');
const { print } = require('./helper');
const config = require('./config');
const routes = require('./routes');

(async () => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route(routes);
  await server.start();
  print(`Server berjalan di ${server.info.uri}`);
})();
