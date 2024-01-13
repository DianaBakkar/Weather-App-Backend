import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    id: number;

@ManyToOne(() => User, (user) => user.locations)
 @JoinColumn({ name: 'user_id' })
 user: User;
    
  @Column()
  city_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

 

}
