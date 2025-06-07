import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
//import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { editUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser('id') userId: number) {
    //  @GetUser('email') email: string
    //console.log({ user: req.user });
    // console.log({ email });
    // return { userId, email };
    return userId;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: editUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
