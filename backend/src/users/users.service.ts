import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Profile } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({ include: { profile: true } });
  }

  async create(username: string, phone: string): Promise<User> {
    return this.prisma.user.create({ data: { username, phone } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.findOne(id); // Check if user exists
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id); // Check if user exists
    return this.prisma.user.delete({ where: { id: user.id } });
  }
}
