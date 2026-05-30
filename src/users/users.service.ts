import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    if(!users.length) throw new NotFoundException('No users found');
    return users;
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        password: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, createUserDto: CreateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return this.usersRepository.save({
      ...user,
      ...createUserDto,
    });
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
