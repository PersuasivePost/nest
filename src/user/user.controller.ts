import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
//import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser('id') userId: number) {
    //  @GetUser('email') email: string
    //console.log({ user: req.user });
    // console.log({ email });
    // return { userId, email };
    return userId;
  }

  @Patch()
  editUser() {}
}
