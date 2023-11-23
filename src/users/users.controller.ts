import {
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(): Promise<User> {
    throw new HttpException(
      {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message:
          "This endpoint does not exist. Please use '/auth/signup' to create a new user.",
      },
      HttpStatus.NOT_FOUND,
    );
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/stats')
  stats(): Promise<{ NumberOfUsers: number }> {
    return this.usersService.stats();
  }
}
