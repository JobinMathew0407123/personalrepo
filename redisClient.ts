// src/redisClient.js

const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  host: 'localhost', // Redis server host
  port: 6379,        // Redis server port
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = { client, getAsync, setAsync };
