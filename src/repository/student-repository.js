import {createPool} from 'mysql2/promise';
import { Student } from '../entity/Student';

//On crée une connexion à notre base de données en lui donnant une 
//string uri qui contient les user et mot de passe mysql ainsi que le
//nom de la base de donnée à laquelle on veut se connecter (à terme il serait préférable d'externaliser ces informations dans un fichier d'environnement)
export const connection = createPool(process.env.DATABASE_URL);

/**
 * Fonction qui fait une requête SQL avec mysql2 et transforme le 
 * résultat de 
 */
export async function findAllStudent() {


    const [rows] = await connection.query('SELECT * FROM student');
    const students = [];
    for (const row of rows) {
        let instance = new Student(row.name, row.first_name, row.birth_date,row.id);
        students.push(instance);

    }
    return students;
}

/**
 * Fait une requête pour récupérer un student spécifique sur la bdd
 * @param {number} id l'id du student à trouver sur la bdd
 * @returns {Promise<Student>} Le student trouvé
 */
export async function findStudent(id) {
    const [rows] = await connection.query('SELECT * FROM student WHERE id=?', [id]);
    if(rows.length === 1) {
        return new Student(rows[0].name, rows[0].first_name, rows[0].birth_date,rows[0].id);
    }

    return null;    
}
/**
 * Fonction qui ajoute un Student en BDD
 * @param {Student} student le student à ajouter
 */
export async function addStudent(student) {
    const [rows] = await connection.query('INSERT INTO student (name,first_name,birth_date) VALUES (?,?,?)', [student.name, student.firstName, student.birthDate]);
    student.id = rows.insertId;

}
/**
 * Fonction qui supprime un Student en BDD
 * @param {Student} student le student à supprimer
 */
export async function deleteStudent(student) {
    const [rows] = await connection.query('DELETE FROM student WHERE id=?', [student.id]);
}

export async function searchStudent(search) {



    const [rows] = await connection.query('SELECT * FROM student WHERE CONCAT(name,first_name,birth_date) LIKE ?', ['%'+search+'%']);
    const students = [];
    for (const row of rows) {
        let instance = new Student(row.name, row.first_name, row.birth_date,row.id);
        students.push(instance);

    }
    return students;
}