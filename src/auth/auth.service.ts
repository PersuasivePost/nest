import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
//import { AuthDto } from './dto';
//import * as argon2 from 'argon2';
import { AuthDto } from './dto/auth.dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signup(dto: AuthDto) {
    return { msg: 'I am signed up!', data: dto };
  }

  signin(dto: AuthDto) {
    return { msg: 'I am signed in!', data: dto };
  }
}
