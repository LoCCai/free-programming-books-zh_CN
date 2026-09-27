```
import hapi from 'hapi';

// Static File Server
import inert from 'inert';
// Render Views
import vision from 'vision';

const server = new hapi.Server();

server.connection(
  {
    host: '127.0.0.1',
    port: 4000,
    router: {
      stripTrailingSlash: true
    }
  },
  { timeout: { server: 5000, socket: 5000 } }
);

// 根据需要注册插件
server.register([inert, vision], () => {
  server.start(() => {
    console.log(`Server started at:  ${server.info.uri}`);
  });
});

// Load Routes
server.route(require('./routes'));

// Error Response Handler
server.ext('onPreResponse', (request, reply) => {
  const response = request.response;
  if (!response.isBoom) {
    return reply.continue();
  }
  // return custom err result
});

// Add Templates Support with handlebars
server.views({
  path: `${__dirname}/lib/views`,
  engines: { html: require('handlebars') },
  partialsPath: `${__dirname}/lib/views/partials`,
  isCached: false
});

module.exports = server;
```
