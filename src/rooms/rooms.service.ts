import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';


@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const habitacion = this.roomsRepository.create({
      title: createRoomDto.title,
      description: createRoomDto.description,
      price: createRoomDto.price,
      image: createRoomDto.image,
    });

    return this.roomsRepository.save(habitacion);
  }

  async findAll() {
    return this.roomsRepository.find();
  }

  async findOne(id: number) {
    const room = await this.roomsRepository.findOne({
      where: { id },
    });

    if (!room) throw new NotFoundException('Room no encontrada');
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id);
    if (!room) throw new NotFoundException('Room no encontrado');
    return this.roomsRepository.save({
      ...room,
      ...updateRoomDto,
    });
  }

  async remove(id: number) {
    const room = await this.findOne(id);
    if (!room) throw new NotFoundException('Room no encontrado');
    return this.roomsRepository.delete(id);
  }
}
