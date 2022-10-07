const request = require('supertest');
const app = require('../../app');
const con = require('../../models/db');

let fakeCheckUser = jest.spyOn(con, 'query');
let fakeInsertUser = jest.spyOn(con, 'query');

describe('GET /', () => {
    describe('Sign up success', () => {
        beforeAll(() => {
            fakeCheckUser.mockResolvedValueOnce([]);
            fakeInsertUser.mockResolvedValueOnce({
                insertedId: 10
            })
        });

        afterAll(() => {
            fakeCheckUser.mockReset();
            fakeInsertUser.mockReset();
        });
        test('should respond with a status 200', async () => {
            const resposne = await request(app).post('/api/auth/signup')
                .send({
                    username: 'test10',
                    email: 'test10@gmail.com',
                    password: '123456',
                    dob: '2020-08-09'
                })

            expect(resposne.status).toBe(200);
            expect(resposne.text).toBe(JSON.stringify({ message: "Success" }));
        });
    });

    describe('User exist', () => {
        beforeAll(() => {
            fakeCheckUser.mockResolvedValueOnce([{ id: 10, email: 'test10@gmail.com' }]);
        });

        afterAll(() => {
            fakeCheckUser.mockReset();
        });
        test('should respond with a status 400', async () => {
            const resposne = await request(app).post('/api/auth/signup')
                .send({
                    username: 'test10',
                    email: 'test10@gmail.com',
                    password: '123456',
                    dob: '2020-08-09'
                })

            expect(resposne.status).toBe(400);
            expect(resposne.text).toBe(JSON.stringify({ message: "User already exist" }));
        });
    });

    describe('Server error', () => {
        beforeAll(() => {
            fakeCheckUser.mockResolvedValueOnce([]);
            fakeInsertUser.mockRejectedValueOnce('Connection timeout');
        });

        afterAll(() => {
            fakeCheckUser.mockReset();
            fakeInsertUser.mockReset();
        });
        test('should respond with a status not 200', async () => {
            const resposne = await request(app).post('/api/auth/signup')
                .send({
                    username: 'test10',
                    email: 'test10@gmail.com',
                    password: '123456',
                    dob: '2020-08-09'
                });
            const jsonResponse = JSON.parse(resposne.text);

            expect(resposne.status).not.toBe(200);
            expect(jsonResponse.message).toBe('Connection timeout');
        });
    });
    
});