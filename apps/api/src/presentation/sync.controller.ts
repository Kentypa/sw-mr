import { Controller, Post } from '@nestjs/common';
import { SyncAllUseCase } from '../application/use-cases/sync-all.use-case.js';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncAllUseCase: SyncAllUseCase) {}

  @Post('all')
  async syncAll() {
    await this.syncAllUseCase.execute();
    return { status: 'ok', message: 'Database synced' };
  }
}
