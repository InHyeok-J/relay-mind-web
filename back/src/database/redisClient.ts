import * as redis from 'redis';
import env from '../configs';

const client = redis.createClient({
    url: env.REDIS_URL,
    // host: 'redis-server',
    // port: 6379,
});

(async () => {
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.on('connection', () => {
        console.log('redis success');
    });
})();

export default client;
