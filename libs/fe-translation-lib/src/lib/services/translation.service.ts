import { inject, Injectable } from '@angular/core';
import { StorageEnum } from '@share-lib';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class FeTranslationService {
  private readonly _translate = inject(TranslateService);
  readonly currentLang = this._translate.currentLang;

  constructor() {
    this._translate.addLangs(['en', 'no']);
  }

  useDefaultLanguage() {
    this._translate.setDefaultLang('en');
    this.useBrowserLanguage();
  }

  changeLanguage(language: string) {
    this._translate.use(language);
    localStorage.setItem(StorageEnum.DEFAULT_LANGUAGE, language);
  }

  private useBrowserLanguage() {
    const browserLang = this._translate.getBrowserLang();
    const savedLanguage = localStorage.getItem(StorageEnum.DEFAULT_LANGUAGE);
    const defaultLanguage = browserLang?.match(/en|fr/) ? browserLang : 'en';
    this._translate.use(savedLanguage || defaultLanguage);
  }
}
