import { Module } from '@nestjs/common'

import { FilesService } from '../services'

@Module({
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
