import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'dev',
  password: process.env.DATABASE_PASSWORD || 'dev',
  database: process.env.DATABASE_NAME || 'starwars',
  entities: ['src/**/*.orm-entity.ts'],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  synchronize: false,
});
