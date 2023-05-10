import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../services/login.service';
import { AuthServiceMock } from '../services/login.service.mock';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { PushModule } from '@rx-angular/template/push';
import { FeTranslationLibModule } from '@fe-translation-lib';
import { Router } from '@angular/router';
import { getFixtureElement, waitFor } from '@share-lib';

const routerMock = jest.fn().mockImplementation(() => ({ navigate: () => Promise.resolve(true) }));

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeTranslationLibModule, PushModule],
      declarations: [LoginPageComponent],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(LoginPageComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when username value changes', () => {
    let spyObj: unknown;

    beforeEach(() => {
      component.ngOnInit();
      spyObj = jest.spyOn(authService, 'validateUsername');
    });

    it('should call the validateUsername function when username contains a value', async () => {
      component.username().patchValue('marvine bamba');
      await waitFor(500);
      expect(spyObj).toHaveBeenCalledWith('marvine bamba');
    });

    it('should not call the validateUsername function when username does not have a value', async () => {
      component.username().patchValue('');
      await waitFor(500);
      expect(spyObj).not.toHaveBeenCalled();
    });
  });

  describe('submit button', () => {
    const submitBtn = () => <HTMLButtonElement>getFixtureElement(fixture, '[test-id="submit-button"]');

    beforeEach(() => {
      component.username().setValue('marvine bamba');
      component.password().setValue('password123!');
      jest.spyOn(component, 'hasInvalidUserName').mockImplementation(() => false);
    });

    it('should be enabled when all conditions are met', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      expect(submitBtn().disabled).toBeFalsy();
    });

    it('should be disabled when username is invalid', async () => {
      component.username().setValue('');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(submitBtn().disabled).toBeTruthy();
    });

    it('should be disabled when password is invalid', async () => {
      component.password().setValue('');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(submitBtn().disabled).toBeTruthy();
    });

    it('should be disabled when username is not found in the backend', async () => {
      jest.spyOn(component, 'hasInvalidUserName').mockImplementation(() => true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(submitBtn().disabled).toBeTruthy();
    });
  });
});
