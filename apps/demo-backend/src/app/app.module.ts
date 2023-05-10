import { Module } from '@nestjs/common';
import { AppRouteModule } from './app-routing.module';
import { AppController } from './app.controller';
// import { UserStoreModule } from './store/user-store.module';
import { BeStoreLibModule } from '@be-store-lib';
import { ConfigModule } from '@nestjs/config';
import configuration from '../configuration';

@Module({
  imports: [
    AppRouteModule,
    BeStoreLibModule,
    ConfigModule.forRoot({ envFilePath: '.env', cache: true, load: [configuration] })
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
