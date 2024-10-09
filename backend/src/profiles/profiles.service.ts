import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Profile } from '@prisma/client';

interface ProfileCreateInput {
  email: string;
  gender?: string;
  address?: string;
  pincode?: string;
  city?: string;
  state?: string;
  country?: string;
}

interface ProfileUpdateInput {
  email?: string;
  gender?: string;
  address?: string;
  pincode?: string;
  city?: string;
  state?: string;
  country?: string;
}

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: number): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async create(userId: number, data: ProfileCreateInput): Promise<Profile> {
    return this.prisma.profile.create({ data: { userId, ...data } });
  }

  async update(userId: number, data: ProfileUpdateInput): Promise<Profile> {
    await this.findByUserId(userId); // Check if profile exists
    return this.prisma.profile.update({ where: { userId }, data });
  }

  async remove(userId: number): Promise<Profile> {
    const profile = await this.findByUserId(userId); // Check if profile exists
    return this.prisma.profile.delete({ where: { userId: profile.userId } });
  }
}
