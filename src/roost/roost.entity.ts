import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class RoostEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    hatched: string;

    @Column()
    color: string;

    @Column()
    weight: number;
    
}

export default RoostEntity;