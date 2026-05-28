import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { UpdateRoomDto } from '../rooms/dto/update-room.dto';


@Injectable()
export class ActivitiesService {
  constructor(
      @InjectRepository(Activity)
      private readonly activitiesRepository: Repository<Activity>,
    ) {}
  
    async create(createActivityDto: CreateActivityDto) {
      const activity = this.activitiesRepository.create({
        title: createActivityDto.title,
        description: createActivityDto.description,
        price: createActivityDto.price,
        image: createActivityDto.image,
      });
  
      return this.activitiesRepository.save(activity);
    }
  
    async findAll() {
      return this.activitiesRepository.find();
    }
  
    async findOne(id: number) {
      const activity = await this.activitiesRepository.findOne({
        where: { id },
      });
  
      if (!activity) throw new NotFoundException('Activity no encontrada');
      return activity;
    }
  
    async update(id: number, updateActivityDto: UpdateActivityDto) {
      const activity = await this.findOne(id);
      if (!activity) throw new NotFoundException('Activity no encontrada');
      return this.activitiesRepository.save({
        ...activity,
        ...updateActivityDto,
      });
    }
  
    async remove(id: number) {
      const activity = await this.findOne(id);
      if (!activity) throw new NotFoundException('Activity no encontrada');
      return this.activitiesRepository.delete(id);
    }
}
