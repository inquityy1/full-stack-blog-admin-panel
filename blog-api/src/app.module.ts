import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostsModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
