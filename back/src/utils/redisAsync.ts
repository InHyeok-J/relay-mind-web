import client from '../database/redisClient';
import { promisify } from 'util';

export const getUserList = promisify(client.smembers).bind(client);

export const setUserList = promisify((data, cb) =>
    client.sadd('userList', data, (err, ...results) => cb(err, results))
).bind(client);

export const delUserList = promisify((data, cb) =>
    client.srem('userList', data, (err, ...results) => cb(err, results))
).bind(client);
