import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MemberCreatedEvent } from '../events/member-created.event';

@Injectable()
export class MemberNotificationsListener {
    private readonly logger = new Logger(MemberNotificationsListener.name);

    @OnEvent('member.created')
    handleMemberCreated({ member }: MemberCreatedEvent): void {
        this.logger.log(`New member added: ${member.name} (${member.role})`);
    }
}
