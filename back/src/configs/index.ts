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

const envExport = {
    PORT: env.PORT,
    COOKIE_SECRET: env.COOKIE_SECRET,
};
export default envExport;
