import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() body: { title: string; content: string }) {
    return this.postsService.create(body);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { title?: string; content?: string }) {
    return this.postsService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(+id);
  }
}