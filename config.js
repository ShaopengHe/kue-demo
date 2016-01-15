module.exports = {
  kue: {
    prefix: 'q',
    redis: {
      port: 6400,
      host: 'localhost',
      db: 4,
      options: {
        // see https://github.com/mranney/node_redis#rediscreateclient
      }
    }
  },
  kueUI: {
    username: 'username',
    password: 'password',
    port: 3050
  }
};
