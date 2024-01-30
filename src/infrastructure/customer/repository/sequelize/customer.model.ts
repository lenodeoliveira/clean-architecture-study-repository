import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "customers",
    timestamps: false
})

export default class CustomerModel extends Model {
    @PrimaryKey
    @Column(DataType.STRING)
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare street: string;
    
    @Column(DataType.NUMBER)
    declare number: number;

    @Column(DataType.STRING)
    declare zipcode: string;

    @Column(DataType.STRING)
    declare city: string;

    @Column(DataType.BOOLEAN)
    declare active: boolean;

    @Column(DataType.NUMBER)
    declare rewardPoints: number;
} 