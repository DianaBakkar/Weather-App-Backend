import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Location } from '../entities/location.entity';
import { WeatherData } from '../entities/weather-data.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'wasdia304',
  database: 'weatherapp',
  logging:true,
  entities: [User, Location, WeatherData],
  synchronize: true,
};
