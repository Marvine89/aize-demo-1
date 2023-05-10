import { Module } from '@nestjs/common';
import { BeAuthLibModule } from '@be-auth-lib';
import { BeUserController } from './be-user-lib.controller';
import { BeUserLibService } from './be-user-lib.service';

@Module({
  imports: [BeAuthLibModule],
  providers: [BeUserLibService],
  controllers: [BeUserController]
})
export class BeUserLibModule {}
