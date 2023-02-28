import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Users } from './schema/users.schema';
import { UsersRepository } from './repository/users.repository';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Cache } from 'cache-manager';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getUserById(_id: string): Promise<Users> {
    try {
      return this.usersRepository.findOne({ _id });
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
  async getUsers(): Promise<Users[]> {
    try {
      return this.usersRepository.find({});
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
  async createUser(
    email: string,
    userName: string,
    password: string,
  ): Promise<Users> {
    try {
      const hashed = await argon2.hash(password, { hashLength: 40 });
      return this.usersRepository.create({
        email,
        userName,
        password: hashed,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async login(email, password): Promise<Users> {
    try {
      const user = await this.usersRepository.findOne({ email });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      if (await argon2.verify(user.password, password, { hashLength: 40 }))
        return user;
      else throw new HttpException('Unverified', HttpStatus.UNAUTHORIZED);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
  async updateUser(userId: string, userUpdates: UpdateAuthDto): Promise<Users> {
    try {
      return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async deleteUser(userId: string): Promise<Users> {
    try {
      return this.usersRepository.delete({ _id: userId });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async requestOtp(email: string): Promise<any> {
    try {
      const user = await this.usersRepository.findOne({ email });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const otp = this.generateOTP();
      await this.cacheManager.set(
        `${user.email}`,
        otp,
        1000 * 60 * 10, // 10 minutes
      );
      return {
        otp,
      };
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async verifyOtp(email: string, otp: string): Promise<any> {
    const user = await this.usersRepository.findOne({ email });
    const val = await this.cacheManager.get(`${user.email}`);
    if (user && val && val === otp) {
      await this.cacheManager.del(`${user.email}`);
      return {
        message: 'verified successfully',
      };
    } else {
      throw new HttpException('Unverified', HttpStatus.UNAUTHORIZED);
    }
  }

  generateOTP(length = 6) {
    let otp = '';
    const characters =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      otp += characters[index];
    }

    return otp;
  }
}
