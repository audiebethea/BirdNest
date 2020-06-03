import { createConnection } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';

const roostDb = createConnection({
    name: 'roost',
    type: 'postgres',
    //because this isn't a module, we cannot use ConfigModule/Service to access env
    //variables and thus must pull them using dotenv
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [path.dirname(__dirname + '/../**/*.entity.ts')],
    synchronize: false
})

export default roostDb;