import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Users, UsersDocument } from '../schema/users.schema';
@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}
  async findOne(userFilterQuery: FilterQuery<Users>): Promise<Users> {
    return this.userModel.findOne(userFilterQuery);
  }

  async find(usersFilterQuery: FilterQuery<Users>): Promise<Users[]> {
    return this.userModel.find(usersFilterQuery);
  }

  async create(user: Users): Promise<Users> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<Users>,
    user: Partial<Users>,
  ): Promise<Users> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user, {
      new: true,
    });
  }

  async delete(userFilterQuery: FilterQuery<Users>): Promise<Users> {
    return this.userModel.findByIdAndDelete(userFilterQuery);
  }
}
