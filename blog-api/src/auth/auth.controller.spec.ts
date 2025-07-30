import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should call AuthService.login and return token', async () => {
    const dto = { username: 'admin', password: 'password' };
    mockAuthService.login.mockResolvedValue({ access_token: 'fake-jwt' });

    const result = await controller.login(dto);

    expect(service.login).toHaveBeenCalledWith('admin', 'password');
    expect(result).toEqual({ access_token: 'fake-jwt' });
  });

  it('should throw error if AuthService.login fails', async () => {
    const dto = { username: 'wrong', password: 'wrong' };
    mockAuthService.login.mockRejectedValue(new Error('Invalid credentials'));

    await expect(controller.login(dto)).rejects.toThrow('Invalid credentials');
  });
});
