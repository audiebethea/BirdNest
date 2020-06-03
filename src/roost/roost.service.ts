import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoostEntity } from './roost.entity';
import { CreateEgg } from './dtos/create-egg.dto';

@Injectable()
export class RoostService {
    constructor(
        @InjectRepository(RoostEntity)
        private roostRepository: Repository<RoostEntity>,
    ) {}
    
    findAllInhabitants(): Promise<RoostEntity[]>{
        return this.roostRepository.find();
    }

    findAllBirds(): Promise<RoostEntity[]>{
        return this.roostRepository.find({hatched: true});
    }

    findAllEggs(): Promise<RoostEntity[]>{
        return this.roostRepository.find({hatched: false});
    }

    findOneById(id: string): Promise<RoostEntity>{
        return this.roostRepository.findOne(id);
    }

    async createEgg(createEgg: CreateEgg): Promise<RoostEntity>{
        const newEgg = await this.roostRepository.insert(createEgg);
        return newEgg;
    }

    async createBulkEggs(createBulkEggs: CreateEgg[]): Promise<RoostEntity[]>{
        const newEggs = await this.roostRepository.insert(createBulkEggs);
        return newEggs;
    }

    async hatchEgg(id: string, hatchEgg: CreateEgg): Promise<RoostEntity>{
        const newBird = await this.roostRepository.update(id, {...hatchEgg});
        return await this.roostRepository.findOne(id);
    }

    async removeInhabitant(id: string): Promise<any>{
        return await this.roostRepository.delete(id);
    }
}
