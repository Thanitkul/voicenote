const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const con = require('../../models/db');

let fakeGetCourses = jest.spyOn(con, 'query');
let fakeJwtVerify = jest.spyOn(jwt, 'verify');

describe('GET /api/student/courses', () => {
    describe('Can get courses', () => {
        beforeAll(() => {
            fakeJwtVerify.mockReturnValueOnce({ userId: 10 });
            fakeGetCourses.mockResolvedValueOnce([
                { id: 1, courseName: 'Test 1', code: 'T001', isLive: false, liveGroupId: 1 },
                { id: 2, courseName: 'Test 2', code: 'T002', isLive: false, liveGroupId: 2 },
                { id: 3, courseName: 'Test 3', code: 'T003', isLive: false, liveGroupId: 3 },
            ])
        });

        afterAll(() => {
            fakeJwtVerify.mockReset();
            fakeGetCourses.mockReset();
        });

        test('should respond with a status 200', async () => {
            const response = await request(app).get('/api/student/courses')
                .auth('fake-token-123456789', { type: 'bearer' });

            expect(response.status).toBe(200);
        });
    });

    describe('Server error', () => {
        beforeAll(() => {
            fakeJwtVerify.mockReturnValueOnce({ userId: 10 });
            fakeGetCourses.mockRejectedValueOnce({ message: 'Connection timeout!' })
        });

        afterAll(() => {
            fakeJwtVerify.mockReset();
            fakeGetCourses.mockReset();
        });

        test('should respond with a status is not 200', async () => {
            const response = await request(app).get('/api/student/courses')
                .auth('fake-token-123456789', { type: 'bearer' });
                // .query({ name: 'test', email: 'test1@gmail.com' });
            // http://localhost:8080/api/student/courses?name=test&email=test1@gmail.com

            expect(response.status).not.toBe(200);
            expect(response.text).toBe(JSON.stringify({ message: 'Connection timeout!' }));
        });
    });

});