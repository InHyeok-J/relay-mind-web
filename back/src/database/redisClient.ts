import { createClient } from 'redis';
import env from '../configs';

const client = createClient({
    url: env.REDIS_URL,
});

(async () => {
    client.on('error', (err) => console.log('Redis Client Error', err));
})();

export default client;
