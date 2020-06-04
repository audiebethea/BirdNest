import { Test, TestingModule } from '@nestjs/testing';
import { RoostService, RoostServiceMock } from './roost.service';
import { RoostController } from './roost.controller';

describe('Firewall Controller', () => {
    let controller: RoostController;
    let roostService: RoostService;

    beforeEach(async () => {
        const RoostServiceProvider = {
            provide: RoostService,
            useClass: RoostServiceMock
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoostController],
            providers: [RoostServiceProvider]
        }).compile();

        controller = module.get<RoostController>(RoostController);
    })

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })
})