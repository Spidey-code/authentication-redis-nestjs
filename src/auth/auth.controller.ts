import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  CACHE_MANAGER,
  Inject,
  Query,
  Delete,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

import { Users } from './schema/users.schema';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('users')
export class AuthController {
  randomNumDbs = Math.floor(Math.random() * 10);
  constructor(
    private readonly usersService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/byId')
  async getUser(@Query('userId') userId: string): Promise<any> {
    console.log('getUser');
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<Users[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateAuthDto): Promise<Users> {
    return this.usersService.createUser(
      createUserDto.email,
      createUserDto.userName,
      createUserDto.password,
    );
  }

  @Get('/login')
  async login(@Body() loginUserDto: any): Promise<Users> {
    return this.usersService.login(loginUserDto.email, loginUserDto.password);
  }

  @Patch('/update')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateAuthDto,
  ): Promise<Users> {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete('/delete')
  async deleteUser(@Query('userId') userId: string): Promise<Users> {
    console.log(`deleteUser ${userId}`);
    return this.usersService.deleteUser(userId);
  }

  @Get('/requestOtp')
  async requestOtp(@Query('email') email: string): Promise<any> {
    return this.usersService.requestOtp(email);
  }

  @Post('/verifyOtp')
  async verifyOtp(@Body() verifyOtpDTo: any): Promise<any> {
    return this.usersService.verifyOtp(verifyOtpDTo.email, verifyOtpDTo.otp);
  }
}
