import request from "supertest";
import { connection } from "../src/repository/student-repository";
import { server } from "../src/server";

describe('API Student routes', () => {


    beforeEach(async () => {
        await connection.query('START TRANSACTION');
    })

    afterEach(async () => {
        await connection.query('ROLLBACK');
    })



    it('should return student list on GET', async () => {
        let response = await request(server)
            .get('/api/student')
            .expect(200);
        //La réponse doit contenir un tableau de Student
        expect(response.body).toContainEqual({
            id: expect.any(Number),
            name: expect.any(String),
            firstName: expect.any(String),
            birthDate: expect.any(String)
        });
    });

    it('should return a specific student on GET with id', async () => {
        let response = await request(server)
            .get('/api/student/1')
            .expect(200);
        //La réponse doit contenir un tableau de Student
        expect(response.body).toEqual({
            id: 1,
            name: expect.any(String),
            firstName: expect.any(String),
            birthDate: expect.any(String)
        });
    });

    it('should return 404 on GET with unexisting id', async () => {
        await request(server)
            .get('/api/student/9999')
            .expect(404);

    });

    it('should add a new student', async () => {
        const response = await request(server)
            .post('/api/student')
            .send({
                name: 'Test',
                firstName: 'Test',
                birthDate: '2021-06-28'
            }).expect(201);
        expect(response.body).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
            firstName: expect.any(String),
            birthDate: expect.any(String)
        });
    });

    it('should delete student', async () => {
        await request(server)
            .delete('/api/student/5')
            .expect(204);

        
    });


    it('should return matching student list on GET with search', async () => {
        let response = await request(server)
            .get('/api/student?search=on')
            .expect(200);
        //La réponse doit contenir un tableau de Student
        expect(response.body).toContainEqual({
            id: expect.any(Number),
            name: expect.stringContaining('on'),
            firstName: expect.any(String),
            birthDate: expect.any(String)
        });
    });

})