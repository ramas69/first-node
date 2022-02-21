import express from 'express';
import cors from 'cors';
import { firstController } from './controller/first-controller';
import { studentController } from './controller/student-controller';


export const server = express();

server.use(express.json());
server.use(cors());

/**
 * On peut rajouter un router sur notre serveur en utilisant la fonction use de celui ci
 */
server.use( firstController);

/**
 * On peut également indiqué un "prefix" qui s'appliquera sur toutes 
 * les routes du router en question. Ici, il faut considérer que
 * toutes les routes du studentController commenceront par /api/student
 */
server.use('/api/student', studentController);
