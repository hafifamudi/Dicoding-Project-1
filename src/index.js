require('dotenv').config();
const Hapi = require('@hapi/hapi');

// Music Plugin
const musics = require('./api/open-music');
const MusicsService = require('./services/postgres/MusicsService');
const MusicsValidator = require('./validator/musics');

// Users Plugin
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
  const musicsService = new MusicsService();
  const usersService = new UsersService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: musics,
      options: {
        service: musicsService,
        validator: MusicsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
  console.log(`env variable ${process.env.PGUSER}`);
};

init();
