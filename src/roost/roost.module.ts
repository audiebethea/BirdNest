import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoostEntity } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature(RoostEntity)],
    exports: [TypeOrmModule]
})

export class RoostModule {}