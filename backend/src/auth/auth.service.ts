import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(username: string, password: string): Promise<User> {
    try {
      console.log('Registrando usuário:', username);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({ username, password: hashedPassword });
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
