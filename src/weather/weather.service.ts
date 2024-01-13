import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { WeatherData } from 'src/entities/weather-data.entity';
import { Location } from 'src/entities/location.entity';
import { LocationRepository } from 'src/repositories/location.repository';
import { User } from 'src/entities/users.entity';

@Injectable()
export class WeatherService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly locationRepository: LocationRepository,
  ) {}

  async getSavedLocationsForUser(userId: number): Promise<Location[]> {
   
    const user = await this.locationRepository.getUserById(userId);

    
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

   
    const locations = await this.locationRepository.getSavedLocationsForUser(user);
    return locations;
  }

  async saveWeatherData(weatherData: WeatherData): Promise<WeatherData> {
    return await this.entityManager.save(WeatherData, weatherData);
  }

  async saveLocationForUser(userId: number, locationData: Partial<Location>): Promise<Location> {
    const location = this.entityManager.create(Location, {
      ...locationData,
      user: { id: userId } as User, 
    });
    return await this.entityManager.save(Location, location);
  }

  async getLocationsForUser(userId: number): Promise<Location[]> {
    return this.entityManager.query(
      'SELECT * FROM location WHERE user_id = $1',
      [userId]
    );
  }
}
