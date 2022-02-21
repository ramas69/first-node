import { Router } from "express";
import { Student } from "../entity/Student";

export const firstController = Router();

firstController.get('/bloup', (request, response) => {
    response.send('Salut !');
});

firstController.get('/api/first', (req, resp) => {
    
    resp.json({
        message: 'coucou'
    });
});

firstController.get('/api/increment/:number', (req,resp) => {

    const param = Number(req.params.number);
    if(isNaN(param)) {
        
        resp.status(400).json({
            error:'Param must be a number'
        });
        return;
    }
    resp.json({
        result:param+1
    });
});

firstController.post('/api/first-post', (req,resp) => {
    const student = new Student(req.body.name, req.body.firstName, null, 50);
    resp.json(student);
});

