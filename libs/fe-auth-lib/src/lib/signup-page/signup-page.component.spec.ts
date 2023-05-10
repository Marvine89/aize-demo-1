import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpPageComponent } from './signup-page.component';
import { AuthService } from '../services/login.service';
import { AuthServiceMock } from '../services/login.service.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PushModule } from '@rx-angular/template/push';
import { FeTranslationLibModule } from '@fe-translation-lib';

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FeTranslationLibModule, PushModule],
      declarations: [SignUpPageComponent],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
