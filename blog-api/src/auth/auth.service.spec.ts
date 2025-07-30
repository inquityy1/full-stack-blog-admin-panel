import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService = {
    sign: jest.fn(() => 'fake-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should return user for valid credentials', async () => {
    // Override validateUser temporarily for predictable behavior
    jest.spyOn(service, 'validateUser').mockResolvedValue({ id: 1, username: 'admin' });

    const result = await service.login('admin', 'password');
    expect(result).toEqual({ access_token: 'fake-jwt-token' });
  });

  it('should throw UnauthorizedException for invalid credentials', async () => {
    jest.spyOn(service, 'validateUser').mockResolvedValue(null);
    await expect(service.login('wrong', 'wrong')).rejects.toThrow('Invalid credentials');
  });
});
