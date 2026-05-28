import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post('create')
  async create(@Body() dto:  CreateActivityDto) {
    return await this.activitiesService.create(dto);
  }

  @Get('getAll')
  async getAll() {
    return await this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.activitiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.activitiesService.remove(id);
  }
}

