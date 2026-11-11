import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Members (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
        );
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('GET /members is public and returns an array', () => {
        return request(app.getHttpServer())
            .get('/members')
            .expect(200)
            .expect((res) => {
                expect(Array.isArray(res.body)).toBe(true);
            });
    });

    it('GET /members/:id returns 404 for a non-existent member', () => {
        return request(app.getHttpServer()).get('/members/999999').expect(404);
    });

    it('POST /members without a token returns 401', () => {
        return request(app.getHttpServer())
            .post('/members')
            .send({ name: 'Ada Lovelace', role: 'President' })
            .expect(401);
    });

    it('POST /auth/login with valid credentials returns an access token', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'admin@gmail.com', password: 'admin123' })
            .expect(201)
            .expect((res) => {
                expect(typeof res.body.access_token).toBe('string');
            });
    });

    it('POST /auth/login with invalid credentials returns 401', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'admin@clubmembers.local', password: 'wrong' })
            .expect(401);
    });
});
