import { Test, TestingModule } from '@nestjs/testing';
import { RoostService, RoostServiceMock } from './roost.service';
import { roostData } from './__mocks__/roost.data';

describe('Roost Service', () => {
    let service: RoostService;

    //anytime we run something, create a TestingModule that gets our roost service
    beforeEach(async () => {
        const RoostServiceProvider = {
            provide: RoostService,
            useClass: RoostServiceMock
        }
        const module: TestingModule = await Test.createTestingModule({
            providers: [RoostService, RoostServiceProvider]
        }).compile();

        service = module.get<RoostService>(RoostService);
    });

    //make sure it is defined by TestingModule
    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    //make sure findall returns an array
    it('should return an array of roost data', async () => {
        const results = await service.findAllInhabitants();
        expect(results).toHaveLength(results.length);
    })

    //make sure it returns a rule with a specific id
    it('should return the inhabitant with the correct id', async () => {
        const inhabitant = roostData[0];
        const results = await service.findOneById(inhabitant.id);
        expect(results).toHaveProperty("id");
        expect(results).toMatchObject(inhabitant);
    })

    //make sure findBirds returns only birds
    it('should return only birds', async () => {
        const results = await service.findAllBirds();
        expect(results).toHaveProperty('hatched', 'true');
    })

    //make sure findEggs returns only eggs
    it('should return only eggs', async () => {
        const results = await service.findAllEggs();
        expect(results).toHaveProperty('hatched', 'false');
    })

})