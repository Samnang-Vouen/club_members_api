import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { MembersService } from './members.service';

describe('MembersService', () => {
    let service: MembersService;
    let repository: jest.Mocked<Repository<Member>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MembersService,
                {
                    provide: getRepositoryToken(Member),
                    useValue: {
                        find: jest.fn(),
                        findOneBy: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get(MembersService);
        repository = module.get(getRepositoryToken(Member));
    });

    it('findAll returns all members', async () => {
        const members = [{ id: 1, name: 'Ada', role: 'President', active: true }] as Member[];
        repository.find.mockResolvedValue(members);

        await expect(service.findAll()).resolves.toEqual(members);
    });

    it('findOne returns the member when found', async () => {
        const member = { id: 1, name: 'Ada', role: 'President', active: true } as Member;
        repository.findOneBy.mockResolvedValue(member);

        await expect(service.findOne(1)).resolves.toEqual(member);
    });

    it('findOne throws NotFoundException when the member does not exist', async () => {
        repository.findOneBy.mockResolvedValue(null);

        await expect(service.findOne(999)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('create saves a new member', async () => {
        const dto = { name: 'Ada', role: 'President' };
        const created = { ...dto } as Member;
        const saved = { id: 1, ...dto, active: true } as Member;
        repository.create.mockReturnValue(created);
        repository.save.mockResolvedValue(saved);

        await expect(service.create(dto)).resolves.toEqual(saved);
        expect(repository.create).toHaveBeenCalledWith(dto);
        expect(repository.save).toHaveBeenCalledWith(created);
    });
});
