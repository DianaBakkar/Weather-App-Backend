import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Location } from 'src/entities/location.entity';
import { LocationRepository } from 'src/repositories/location.repository';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationRepository)
    private readonly locationRepository: LocationRepository,
    private readonly entityManager: EntityManager, 
  ) {}

  async saveLocationForUser(userId: number, locationData: Partial<Location>): Promise<Location> {
    return this.locationRepository.saveLocationForUser(userId, locationData);
  }

  async getLocationsForUser(userId: number): Promise<Location[]> {
 
    const userLocations = await this.entityManager.query(
      'SELECT * FROM location WHERE userId = $1',
      [userId],
    );

    
    return userLocations;
  }
}
