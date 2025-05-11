import {
  Controller,
  Post,
  Req,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
//import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //@HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    console.log('Is DTO instance?', dto instanceof AuthDto);
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    console.log(dto);
    //console.log('Is DTO instance?', dto instanceof AuthDto);
    //req.user;
    return this.authService.signin(dto);
  }
}
