import { AllowNull, Column, CreatedAt, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Unique
  @Column
  username: string;

  @AllowNull
  @Column
  email: string;

  @Column
  password: string;

  @AllowNull
  @Column
  phone: string;

  @AllowNull
  @Column
  address: string;

  @CreatedAt
  createdAt: Date;
}
