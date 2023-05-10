import { Component, inject } from '@angular/core';
import { FeTranslationService } from '@fe-translation-lib';

@Component({
  selector: 'demo-project',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  private readonly _translation = inject(FeTranslationService);

  constructor() {
    this._translation.useDefaultLanguage();
  }
}
