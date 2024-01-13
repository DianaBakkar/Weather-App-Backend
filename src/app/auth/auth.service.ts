import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/users.entity';
import { CreateUserDto } from './create-user.dto'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const { username, password } = createUserDto;

    
    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
     
      throw new Error('Username is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(newUser);

    const payload = { username: savedUser.username, sub: savedUser.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
