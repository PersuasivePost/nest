import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
//import { PrismaClientKnownRequestError } from '@prisma/client';
//import { AuthDto } from './dto';
import * as argon from 'argon2';
import { AuthDto } from './dto/auth.dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    //genetate password hash
    const hash = await argon.hash(dto.password);

    //save new user in db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        //   select: {
        //     id: true,
        //     email: true,
        //     createdAt: true,
        //   },
      });

      //delete user.hash;
      const { hash: userHash, ...userWithoutHash } = user; // exclude the hash property

      // return the saved user
      return userWithoutHash; // return the user object without the hash

      //return { msg: 'I am signed up!', data: dto };
      // } catch (error) {
      //   console.log('Error:', error);
      //   if (error instanceof PrismaClientKnownRequestError) {
      //     if (error.code === 'P2002') {
      //       //duplicate email error
      //       throw new ForbiddenException('Credentials taken');
      //     }
      //   }
      // }
    } catch (error: any) {
      if (error.code === 'P2002') {
        //duplicate email error
        throw new ForbiddenException('Credentials taken');
      }

      //otherwise
      console.log('unhandeled error during signup: ', error.message);
      return {
        error: 'signup failed',
      };
    }

    //throw Error('Something went wrong');
  }

  async signin(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // user not found throw exceptiom
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    //compare password
    const pwMatches = await argon.verify(user.hash, dto.password);

    // password wring throw
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    //send back user
    //delete user.hash; // remove the hash property from the user object
    const { hash: userHash, ...userWithoutHash } = user; // exclude the hash property

    // return the saved user
    return userWithoutHash; // return the user object without the hash
    //return user;

    //return { msg: 'I am signed in!', data: dto };
  }
}
