const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postMusicHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getMusicsHandler,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getMusicByIdHandler,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putMusicByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteMusicByIdHandler,
  },
];

module.exports = routes;
