import { Module } from '@nestjs/common';
import { WeatherModule } from 'src/weather/weather.module';
import { ForecastModule } from 'src/forecast/forecast.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config'; 

@Module({
  imports: [
    WeatherModule,
    ForecastModule,
    TypeOrmModule.forRoot(databaseConfig), 
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
