import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';

interface ProfileCreateInput {
  email: string;
  gender?: string;
  address?: string;
  pincode?: string;
  city?: string;
  state?: string;
  country?: string;
  userId?:Number;
}

@Controller('api/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get(':userId')
  async findByUserId(@Param('userId') userId: string): Promise<Profile> {
    const profile = await this.profilesService.findByUserId(+userId);
    if (!profile) {
      throw new NotFoundException(`Profile for user ID ${userId} not found`);
    }
    return profile;
  }

  @Post(':userId')
async create(
  @Param('userId') userId: string,
  @Body() data: ProfileCreateInput, // Change this to the correct type
): Promise<Profile> {
  // Ensure all required fields are provided
  const profileData: ProfileCreateInput = {
    email: data.email, // Ensure this and other required fields are populated
    gender: data.gender,
    address: data.address,
    pincode: data.pincode,
    city: data.city,
    state: data.state,
    country: data.country,
    userId: +userId, // Include userId in the profileData
  };

  return this.profilesService.create(+userId, profileData);
}


  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() data: Partial<Profile>,
  ): Promise<Profile> {
    const updatedProfile = await this.profilesService.update(+userId, data);
    if (!updatedProfile) {
      throw new NotFoundException(`Profile for user ID ${userId} not found`);
    }
    return updatedProfile;
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string): Promise<Profile> {
    const deletedProfile = await this.profilesService.remove(+userId);
    if (!deletedProfile) {
      throw new NotFoundException(`Profile for user ID ${userId} not found`);
    }
    return deletedProfile;
  }
}
