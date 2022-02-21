import { Router } from "express";
import { addStudent, deleteStudent, findAllStudent, findStudent, searchStudent } from "../repository/student-repository";

/**
 * Un Router permettra de regrouper des routes par thématique
 * afin d'organiser un peu mieux le code (et de ne pas avoir toutes
 * les routes définies dans un même fichier)
 */
export const studentController = Router();


// /api/student
studentController.get('/', async (req, resp) => {
    try {
        let students;

        if(req.query.search) {
            students = await searchStudent(req.query.search);
        } else {
            students = await findAllStudent();

        }
        resp.json(students);
    } catch (error) {
        resp.status(500).json(error);
    }
});


// /api/student/:id
studentController.get('/:id', async (req, resp) => {
    try {

        let student = await findStudent(req.params.id);
        if (!student) {
            resp.status(404).json({ error: 'Not Found' });
            return;
        }
        resp.json(student);
    }
    catch (error) {
        resp.status(500).json(error);
    }
})


studentController.post('/', async (req, resp) => {
    try {
        let toAdd = req.body;
        await addStudent(toAdd);
        resp.status(201).json(toAdd);
    } catch (error) {
        resp.status(500).json(error);
    }
});

studentController.delete('/:id', async (req, resp)=> {
    try {
        
        await deleteStudent({id:req.params.id});
        resp.status(204).end();
    } catch (error) {
        resp.status(500).json(error);
    }
})