import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class WeatherData {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  temperature: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  humidity: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  wind_speed: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  cloudiness: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  rain_volume: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;


}
