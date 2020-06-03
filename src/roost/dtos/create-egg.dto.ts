import { IsPositive, IsBooleanString} from 'class-validator';

export class CreateEgg {
    @IsBooleanString()
    hatched: string;

    color: string;

    @IsPositive()
    weight: number;
}