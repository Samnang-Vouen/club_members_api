import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    role?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
