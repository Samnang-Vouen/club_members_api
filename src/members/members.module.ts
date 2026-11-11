import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Member } from './entities/member.entity';
import { MemberNotificationsListener } from './listeners/member-notifications.listener';
import { MembersController } from './members.controller';
import { MembersProcessor } from './members.processor';
import { MembersService } from './members.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Member]),
        BullModule.registerQueue({ name: 'members' }),
        AuthModule,
    ],
    controllers: [MembersController],
    providers: [MembersService, MemberNotificationsListener, MembersProcessor],
})
export class MembersModule {}
