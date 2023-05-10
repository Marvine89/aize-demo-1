import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsernameInputComponent } from './username-input.component';
import { AuthService } from '../../services/login.service';
import { AuthServiceMock } from '../../services/login.service.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PushModule } from '@rx-angular/template/push';
import { FeTranslationLibModule } from '@fe-translation-lib';
import { FormControl } from '@angular/forms';

describe('UsernameInputComponent', () => {
  let component: UsernameInputComponent;
  let fixture: ComponentFixture<UsernameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeTranslationLibModule, PushModule],
      declarations: [UsernameInputComponent],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UsernameInputComponent);
    component = fixture.componentInstance;
    component.username = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
