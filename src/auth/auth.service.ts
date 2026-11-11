import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async login({ email, password }: LoginDto): Promise<{ access_token: string }> {
        const adminEmail = this.configService.getOrThrow<string>('ADMIN_EMAIL');
        const adminPasswordHash = this.configService.getOrThrow<string>('ADMIN_PASSWORD_HASH');

        const isValidPassword =
            email === adminEmail && (await bcrypt.compare(password, adminPasswordHash));

        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const access_token = await this.jwtService.signAsync({ sub: email });
        return { access_token };
    }
}
