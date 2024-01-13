import { Module } from '@nestjs/common';
import { WeatherModule } from 'src/weather/weather.module';
import { ForecastModule } from 'src/forecast/forecast.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config'; 
import { AuthModule } from './auth/auth.module';
import { Location } from 'src/entities/location.entity';
import { LocationRepository } from 'src/repositories/location.repository';

@Module({
  imports: [
    WeatherModule,
    ForecastModule,
    TypeOrmModule.forRoot(databaseConfig), 
    TypeOrmModule.forFeature([Location, LocationRepository]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
