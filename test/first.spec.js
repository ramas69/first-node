import request from "supertest";
import { server } from "../src/server"

describe('First api tests', () => {


    it('should send success on /api/first', async () => {
        await request(server)
            .get('/api/first')
            .expect(200)

    });

    it('should return a message on url /api/first', async () => {
        let response = await request(server)
            .get('/api/first')
            .expect('Content-Type', /json/);


        expect(response.body).toEqual({
            message: expect.any(String)
        });
    });

    it('should get url param and increment it', async () => {

        let response = await request(server)
            .get('/api/increment/1')
            .expect(200);

        expect(response.body).toEqual({
            result:2
        });
    });
    it('should respond with an error on NaN param', async () => {

        let response = await request(server)
            .get('/api/increment/hello')
            .expect(400);

        expect(response.body).toEqual({
            error:'Param must be a number'
        });

    });

    it('should return Student with id', async () => {
        let response = await request(server)
            .post('/api/first-post')
            .send({
                firstName: 'Test First',
                name: 'Test Name'
            })
            .expect(200);
        
        expect(response.body).toEqual({
            firstName: 'Test First',
            name: 'Test Name',
            id: 50,
            birthDate: null
        });


    });
});