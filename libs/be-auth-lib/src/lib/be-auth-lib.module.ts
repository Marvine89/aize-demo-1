import { Module } from '@nestjs/common';
import { BeAuthLibController } from './be-auth-lib.controller';
import { BeAuthLibGuard, BeSocketAuthLibGuard } from './be-auth-lib.guard';
import { JwtService } from '@nestjs/jwt';
import { BeAuthLibService } from './be-auth-lib.service';

@Module({
  imports: [],
  controllers: [BeAuthLibController],
  providers: [BeAuthLibService, BeAuthLibGuard, JwtService, BeSocketAuthLibGuard],
  exports: [BeAuthLibGuard, JwtService, BeSocketAuthLibGuard]
})
export class BeAuthLibModule {}
