import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { MemberCreatedEvent } from './events/member-created.event';

@Injectable()
export class MembersService {
    constructor(
        @InjectRepository(Member)
        private readonly membersRepository: Repository<Member>,
        @InjectQueue('members')
        private readonly membersQueue: Queue<Member>,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    findAll(): Promise<Member[]> {
        return this.membersRepository.find();
    }

    async findOne(id: number): Promise<Member> {
        const member = await this.membersRepository.findOneBy({ id });
        if (!member) {
            throw new NotFoundException(`Member with id ${id} not found`);
        }
        return member;
    }

    async create(createMemberDto: CreateMemberDto): Promise<Member> {
        const member = this.membersRepository.create(createMemberDto);
        const savedMember = await this.membersRepository.save(member);

        this.eventEmitter.emit('member.created', new MemberCreatedEvent(savedMember));
        await this.membersQueue.add('member_created', savedMember);

        return savedMember;
    }

    async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
        const member = await this.findOne(id);
        Object.assign(member, updateMemberDto);
        return this.membersRepository.save(member);
    }

    async remove(id: number): Promise<void> {
        const member = await this.findOne(id);
        await this.membersRepository.remove(member);
    }
}
