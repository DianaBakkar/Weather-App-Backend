import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    id: number;
    

  @Column()
  city_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @ManyToOne(() => User, (user) => user.locations)
  user: User;

}
