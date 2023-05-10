import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fe-auth-wrapper-page',
  templateUrl: './wrapper-page.component.html',
  styleUrls: ['./wrapper-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperPageComponent {}
