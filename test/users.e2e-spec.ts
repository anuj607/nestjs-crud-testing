
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

describe('Users contoller e2e', () => {
    let app: INestApplication;
    let userId: number;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
        await app.init();
    });
    // Create User
    it('/users (POST)->create user', async () => {
        const res = await request(app.getHttpServer())
            .post('/users')
            .send({ name: 'John', email: 'john@test.com' })
            .expect(201)
        userId = res.body.id;
        expect(res.body).toHaveProperty("id");
        expect(res.body.email).toBe('john@test.com');
    });
    // Duplicate User
    it('/users (POST) ->should fail duplicate email', async () => {
        await request(app.getHttpServer()).post('/users').send({ name: 'John', email: 'john@test.com' }).expect(409);
    });
    // Invalid data
    it('/users (POST)->should fail duplicate email', async () => {
        await request(app.getHttpServer()).post('/users').send({ name: 'John', email: 'noemail' }).expect(400);
    });

    // Get All Users
    it('/users (GET) -> should return all users', async () => {
        const res = await request(app.getHttpServer()).get('/users').expect(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);

    })
    // Get Users by Id
    it('/users/:id (GET) -> should return users', async () => {
        console.log('userId', userId)
        const res = await request(app.getHttpServer()).get(`/users/${userId}`).expect(200);
        expect(res.body.id).toBe(userId);
        expect(res.body).toHaveProperty('name');
    })
    // GET USER Not Found
    it('/users/:id GET-> should return 404 for missing user', async () => {
        await request(app.getHttpServer()).get(`/users/9999`).expect(404);
    });

    // Update user
    it('/users/:id PUT-> Should update user', async () => {
        const res = await request(app.getHttpServer())
            .put(`/users/${userId}`)
            .send({ name: 'Updated Name' })
            .expect(200);
        expect(res.body.name).toBe('Updated Name')
    });

    // Update Duplicate Email
    it('/users/:id PUT-> Should fail if update with duplicate email', async () => {
        const newUser = await request(app.getHttpServer())
            .post('/users')
            .send({ name: 'Jane', email: 'jane@test.com' })
            .expect(201)
        const newUserId = newUser.body.id;

        const res = await request(app.getHttpServer())
            .put(`/users/${newUserId}`)
            .send({ email: 'john@test.com' })
            .expect(409);

    });

    // UPDATE NON-EXISTENT USER
    it('/users/:id (PUT) -> should return 404 if user not found', async () => {
        await request(app.getHttpServer())
            .put('/users/9999')
            .send({ name: 'Ghost' })
            .expect(404);
    });
    // DELETE User
    it('/users/:id (DELETE) -> should delete user', async () => {
        await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);
        await request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
    });

    //  DELETE NON-EXISTENT USER
    it('/users/:id (DELETE) -> should return 404 if user not found', async () => {
        await request(app.getHttpServer()).delete('/users/9999').expect(404);
    });
    afterAll(async () => {
        await app.close();
    });
});