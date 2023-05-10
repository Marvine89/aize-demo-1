import { Global, Module } from '@nestjs/common';
import { BeStoreLibService } from './be-store-lib.service';

@Global()
@Module({
  imports: [],
  providers: [BeStoreLibService],
  exports: [BeStoreLibService]
})
export class BeStoreLibModule {}
