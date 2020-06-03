import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoostService } from './roost.service';
import RoostEntity from './roost.entity';
import { CreateEgg } from './dtos/create-egg.dto';

@Controller()
export class RoostController{

    constructor(private roostService : RoostService) {}

    @Get()
    findAllInhabitants(): Promise<RoostEntity[]> {
        return this.roostService.findAllInhabitants();
    }

    @Get('birds')
    findAllBirds(): Promise<RoostEntity[]> {
        return this.roostService.findAllBirds();
    }

    @Get('eggs')
    findAllEggs(): Promise<RoostEntity[]> {
        return this.roostService.findAllEggs();
    }

    @Get(":id")
    findOneById(@Param() id: string): Promise<RoostEntity> {
        return this.roostService.findOneById(id);
    }

    @Post()
    async createEgg(@Body() createEgg: CreateEgg): Promise<object> {
        //make sure the inhabitant being created is an egg, not a bird
        if(createEgg.hatched === 'true'){
            return;
        }

        try{
           const newEgg: CreateEgg = await this.roostService.createEgg(createEgg);
           return {
               success: true,
               result: newEgg
           }
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    @Post('/bulk')
    async createBulkEggs(@Body() createBulkEggs: CreateEgg[]): Promise<object> {
        //make sure all inhabitants being created are eggs, not birds
        if(!createBulkEggs.every(egg => egg.hatched === 'false')){
            return;
        }

        try{
            const newEggs: CreateEgg[] = await this.roostService.createBulkEggs(createBulkEggs);
            return {
                success: true,
                result: newEggs
            }
        } catch(err){
            return {
                success: false,
                result: err
            }
        }
    }

    @Put(":id")
    async hatchEgg(@Body() hatchEgg: CreateEgg, @Param() id: string): Promise<object> {
        //check to make sure this bird has not been hatched before
        const existingEgg = this.roostService.findOneById(id);
        if(existingEgg.hatched === false){
            return;
        }

        try{
            const newBird = await this.roostService.hatchEgg(id, hatchEgg);
            return {
                success: true,
                result: newBird
            }
        } catch(err) {
            return{
                success: false,
                result: err
            }
        }
    }

    @Delete(":id")
    async removeInhabitant(@Param() id: string): Promise<object>{
        try{
            const result = await this.roostService.removeInhabitant(id);
            return  {
                success: true,
                result
            }
        } catch (err){
            return {
                success: false,
                error: err
            }
        }
    }
}