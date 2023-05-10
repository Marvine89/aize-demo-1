import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { authGuard } from './auth.guard';
import { TokenService, TokenServiceMock } from '@share-lib';

describe('AuthService', () => {
  const setup = () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [
        authGuard,
        {
          provide: TokenService,
          useClass: TokenServiceMock
        }
      ]
    }).compileComponents();

    return TestBed.runInInjectionContext(authGuard);
  };

  it('should create service', () => {
    expect(setup()).toBeTruthy();
  });
});
