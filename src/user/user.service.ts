import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { editUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async editUser(userId: number, dto: editUserDto) {
    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    // return user.hash;

    // return user;

    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
  }
}
