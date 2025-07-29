import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; content: string }): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async update(id: number, data: { title?: string; content?: string }): Promise<Post> {
    return this.prisma.post.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Post> {
    return this.prisma.post.delete({ where: { id } });
  }
}