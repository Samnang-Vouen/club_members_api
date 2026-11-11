import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
