import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPostsService = {
    create: jest.fn((dto) => ({
      id: 1,
      ...dto,
      createdAt: new Date(),
    })),
    findAll: jest.fn(() => [
      { id: 1, title: 'Test Post', content: 'Test Content', createdAt: new Date() },
    ]),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
      createdAt: new Date(),
    })),
    delete: jest.fn((id) => ({
      id,
      title: 'Deleted Post',
      content: 'Deleted Content',
      createdAt: new Date(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        { provide: PostsService, useValue: mockPostsService },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a post', async () => {
    const dto = { title: 'New Post', content: 'New Content' };
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result.title).toBe('New Post');
  });

  it('should return all posts', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result.length).toBe(1);
  });

  it('should update a post', async () => {
    const dto = { title: 'Updated' };
    const result = await controller.update('1', dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result.title).toBe('Updated');
  });

  it('should delete a post', async () => {
    const result = await controller.delete('1');
    expect(service.delete).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
  });
});
