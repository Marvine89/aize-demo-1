import { ComponentFixture } from '@angular/core/testing';

export function getFixtureElement<T>(fixture: ComponentFixture<T>, selector: string): HTMLElement | null {
  return fixture.debugElement.nativeElement.querySelector(selector);
}
