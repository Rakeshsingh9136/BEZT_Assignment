import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsersModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
