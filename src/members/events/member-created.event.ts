import { Member } from '../entities/member.entity';

export class MemberCreatedEvent {
    constructor(public readonly member: Member) {}
}
