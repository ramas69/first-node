import 'dotenv-flow/config';
import { server } from "./server";
//Si jamais on trouve une variable d'environnement qui spécifie le port, on l'utilise, sinon on utilise le port 3000
const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log('listening  http://localhost:'+port);
});

//En fait c'est pas ouf ces trucs, j'ai essayé de rajouter juste un --delay sur nodemon, ça marche ptêt mieux
//Ces deux trucs permettent de solutionner le soucis de address already in use à priori
process.on('uncaughtException', err => {
    console.log(err, 'Uncaught Exception thrown');
    process.exit(0);
  });
process.on('SIGINT', () => { 
    console.log("exiting…"); 
    process.exit(0); 
});

process.on('exit', () => { 
    console.log("exiting…"); 
    process.exit(0); 
});