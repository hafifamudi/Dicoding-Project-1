const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postMusicHandler,
    options: {
      auth: 'musicsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getMusicsHandler,
    options: {
      auth: 'musicsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getMusicByIdHandler,
    options: {
      auth: 'musicsapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putMusicByIdHandler,
    options: {
      auth: 'musicsapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteMusicByIdHandler,
    options: {
      auth: 'musicsapp_jwt',
    },
  },
];

module.exports = routes;
