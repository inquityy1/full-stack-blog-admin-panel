import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma.service';
import { Post } from '@prisma/client';

describe('PostsService', () => {
  let service: PostsService;
  let prisma: PrismaService;

  const mockPosts: Post[] = [
    { id: 1, title: 'First Post', content: 'Hello World', createdAt: new Date() },
  ];

  const mockPrismaService = {
    post: {
      create: jest.fn().mockResolvedValue(mockPosts[0]),
      findMany: jest.fn().mockResolvedValue(mockPosts),
      update: jest.fn().mockResolvedValue({ ...mockPosts[0], title: 'Updated' }),
      delete: jest.fn().mockResolvedValue(mockPosts[0]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a post', async () => {
    const post = await service.create({ title: 'First Post', content: 'Hello World' });
    expect(prisma.post.create).toHaveBeenCalledWith({
      data: { title: 'First Post', content: 'Hello World' },
    });
    expect(post.title).toBe('First Post');
  });

  it('should return all posts', async () => {
    const posts = await service.findAll();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe('First Post');
  });

  it('should update a post', async () => {
    const updated = await service.update(1, { title: 'Updated' });
    expect(prisma.post.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: 'Updated' },
    });
    expect(updated.title).toBe('Updated');
  });

  it('should delete a post', async () => {
    const deleted = await service.delete(1);
    expect(prisma.post.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(deleted.id).toBe(1);
  });
});
