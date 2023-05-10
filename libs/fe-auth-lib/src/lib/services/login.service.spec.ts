import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './login.service';
import { TokenService, TokenServiceMock, UserStoreService, UserStoreServiceMock } from '@share-lib';
import { EnvironmentToken, environment } from '@fe-environment';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [
        AuthService,
        {
          provide: TokenService,
          useClass: TokenServiceMock
        },
        {
          provide: UserStoreService,
          useValues: UserStoreServiceMock
        },
        {
          provide: EnvironmentToken,
          useValues: environment
        }
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    authService = TestBed.inject(AuthService);
  });

  it('should create service', () => {
    expect(authService).toBeTruthy();
  });
});
