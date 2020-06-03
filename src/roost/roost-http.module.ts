import { Module } from '@nestjs/common';
import { RoostModule } from './roost.module';
import { RoostController } from './roost.controller';
import { RoostService } from './roost.service';

@Module({
    imports: [RoostModule],
    controllers: [RoostController],
    providers: [RoostService]
})

export class RoostHttpModule {}