import { EntityManager } from 'typeorm';
import { Location } from 'src/entities/location.entity';
import { User } from 'src/entities/users.entity';
import { Injectable} from '@nestjs/common';



@Injectable()
export class LocationRepository {
  constructor(private readonly entityManager: EntityManager) {}




  async getUserById(id: number): Promise<User> {
    return this.entityManager.findOne(User, { where: { id } })!;
  }


  async saveLocationForUser(userId: number, locationData: Partial<Location>): Promise<Location> {
    const location = this.entityManager.create(Location, {
      ...locationData,
      user: { id: userId } as User,
    });
    return await this.entityManager.save(Location, location);
  }




  async getSavedLocationsForUser(user: User): Promise<Location[]> {
    return this.entityManager.find(Location, { where: { user } });
  }

  
  
  

  
}
