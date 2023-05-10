import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WrapperPageComponent } from './wrapper-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FeTranslationLibModule } from '@fe-translation-lib';

describe('WrapperPageComponent', () => {
  let component: WrapperPageComponent;
  let fixture: ComponentFixture<WrapperPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeTranslationLibModule],
      declarations: [WrapperPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
