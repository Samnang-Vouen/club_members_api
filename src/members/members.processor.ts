import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { Member } from './entities/member.entity';

@Processor('members')
export class MembersProcessor extends WorkerHost {
    private readonly logger = new Logger(MembersProcessor.name);

    async process(job: Job<Member>): Promise<void> {
        this.logger.log(`Processing job "${job.name}" for member #${job.data.id}`);
    }

    @OnWorkerEvent('completed')
    onCompleted(job: Job<Member>): void {
        this.logger.log(`Job "${job.name}" for member #${job.data.id} completed`);
    }
}
