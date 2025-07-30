import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [PostsModule],
  providers: [PrismaService],
})
export class AppModule {}
