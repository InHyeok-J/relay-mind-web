import * as dotenv from 'dotenv';
dotenv.config();

const NODE_ENV: string = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'production')
    dotenv.config({ path: `${__dirname}/../../.env.prod` });
else if (NODE_ENV === 'development')
    dotenv.config({ path: `${__dirname}/../../.env.dev` });
else if (NODE_ENV === 'test')
    dotenv.config({ path: `${__dirname}/../../.env.test` });

const env = process.env;

const MYSQL_CONFIG = {
    DATABASE_TYPE: env.DATABASE_TYPE,
    DATABASE_HOST: env.DATABASE_HOST,
    DATABASE_PORT: env.DATABASE_PORT,
    DATABASE_USERNAME: env.DATABASE_USERNAME,
    DATABASE_PASSWORD: env.DATABASE_PASSWORD,
    DATABASE_SCHEMA: env.DATABASE_SCHEMA,
};

const envExport = {
    PORT: env.PORT,
    COOKIE_SECRET: env.COOKIE_SECRET,
    MYSQL_CONFIG,
    REDIS_URL: env.REDIS_URL,
};
export default envExport;
