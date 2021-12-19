import client from '../database/redisClient';
import { promisify } from 'util';

export const getUserList = promisify(client.smembers).bind(client);

export const setUserList = promisify((data, cb) =>
    client.sadd('userList', data, (err, ...results) => cb(err, results))
).bind(client);

export const delUserList = promisify((data, cb) =>
    client.srem('userList', data, (err, ...results) => cb(err, results))
).bind(client);

export const HashSetAsync = promisify((key, subkey, value, cb) =>
    client.hmset(key, subkey, value, (err, ...results) => cb(err, results))
).bind(client);
export const HashGetALLAsync = promisify(client.hgetall).bind(client);

export const HashGetOneAsync = promisify((key, subkey, cb) =>
    client.hget(key, subkey, (err, ...results) => cb(err, results))
).bind(client);

export const HashDelAsync = promisify((key, subkey, cb) =>
    client.hdel(key, subkey, (err, ...results) => cb(err, results))
).bind(client);

export const setString = promisify((key, value, cb) =>
    client.set(key, value, (err, ...results) => cb(err, results))
).bind(client);

export const getString = promisify(client.get).bind(client);
