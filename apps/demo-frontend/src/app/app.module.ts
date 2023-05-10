import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeEnvironmentModule } from '@fe-environment';
import { FeTranslationLibModule } from '@fe-translation-lib';
import { HttpTokenInterceptor } from '@share-lib';
import { PrimeNGConfig } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
  primeConfig.ripple = true;
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MessagesModule,
    FeTranslationLibModule,
    FeEnvironmentModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [PrimeNGConfig],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
