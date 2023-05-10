import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { untilDestroyed } from '@share-lib';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { Language } from '../model';
import { FeTranslationService } from '../services';
import { LANGUAGES } from '../utils/languages';

@Component({
  selector: 'fe-translation-dropdown',
  templateUrl: './fe-translation-dropdown.component.html',
  styleUrls: ['./fe-translation-dropdown.component.scss'],
  standalone: true,
  imports: [DropdownModule, TranslateModule, ReactiveFormsModule],
  providers: [FeTranslationService]
})
export class FeTranslationDropdownComponent implements OnInit {
  private readonly _translate = inject(FeTranslationService);
  private readonly _untilDestroyed = untilDestroyed();
  readonly languages: ReadonlyArray<Language> = LANGUAGES;
  private readonly _currentLang = this.languages.find(({ id }) => id === this._translate.currentLang);
  readonly currentLang = new FormControl(this._currentLang, []);

  ngOnInit() {
    this.onLanguageChanged();
  }

  onLanguageChanged() {
    this.currentLang.valueChanges.pipe(this._untilDestroyed()).subscribe(language => {
      language && this._translate.changeLanguage(language.id);
    });
  }
}
