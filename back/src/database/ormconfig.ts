import env from '../configs';
import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

const dbConfig = env.MYSQL_CONFIG;

export default {
    type: dbConfig.DATABASE_TYPE,
    host: dbConfig.DATABASE_HOST,
    port: dbConfig.DATABASE_PORT,
    username: dbConfig.DATABASE_USERNAME,
    password: dbConfig.DATABASE_PASSWORD,
    database: dbConfig.DATABASE_SCHEMA,
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, '..', 'entity', '**', '*.*')],
    migration: [path.join(__dirname, 'migration', '*.*')],
    subscribers: [path.join(__dirname, 'subscriber', '*.*')],
    cli: {
        entitiesDir: path.join(__dirname, '..', 'entity'),
        migrationsDir: path.join(__dirname, 'migration'),
        subscribersDir: path.join(__dirname, 'subscriber'),
    },
} as ConnectionOptions;
