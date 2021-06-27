require('dotenv').config();
const Hapi = require('@hapi/hapi');
const musics = require('./api/open-music');
const MusicsService = require('./services/postgres/MusicsService');
const MusicsValidator = require('./validator/musics');

const init = async () => {
  const musicsService = new MusicsService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: musics,
    options: {
      service: musicsService,
      validator: MusicsValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
  console.log(`env variable ${process.env.PGUSER}`);
};

init();
