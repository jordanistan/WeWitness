import Redis from 'ioredis';

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not defined');
}

const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => {
  console.log('Worker connected to Redis');
});

redis.on('error', (err) => {
  console.error('Worker Redis connection error', err);
});

export default redis;
