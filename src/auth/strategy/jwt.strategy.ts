// copilot fixed code:

// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Strategy } from 'passport-jwt';
// import { ExtractJwt } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(configService: ConfigService) {
//     const jwtSecret = configService.get<string>('JWT_SECRET');
//     if (!jwtSecret) {
//       throw new Error('JWT_SECRET is not defined in the configuration.');
//     }

//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: jwtSecret, // Ensure this is always a valid string
//     });
//   }

//   async validate(payload: any) {
//     // The payload contains the decoded JWT data
//     // You can return user information or perform additional checks here
//     return { userId: payload.sub, username: payload.username };
//   }
// }

// //1:54:11

// video code:

// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ConfigService } from '@nestjs/config';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(config: ConfigService) {
//     super ({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: config.get('JWT_SECRET');
//     })
//   }
// }

// gpt fixed code:
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        config.get<string>('JWT_SECRET') ??
        (() => {
          throw new Error('JWT_SECRET not defined');
        })(),

      // secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    console.log('Payload:', payload);

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { hash, ...userWithoutHash } = user;

    return userWithoutHash; // You can customize this to fetch user data, etc.
  }
}
