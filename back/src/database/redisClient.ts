import { createClient } from 'redis';
import env from '../configs';

const client = createClient({
    url: env.REDIS_URL,
    legacyMode: true,
});

(async () => {
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
})();

export default client;
