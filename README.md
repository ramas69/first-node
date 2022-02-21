# node-first

Un premier projet node.js pour voir un peu la structure et les possibilités de celui ci

## How To use
1. Cloner le projet
2. Créer une base de données sur mysql, puis importer le script avec  : `mysql -u simplon -p database_name < dump.sql`
3. Créer un fichier `.env` avec une DATABASE_URL à l'intérieur
4. lancer le `npm install`
5. lancer le projet avec `npm start` : tournera sur le port 8000

Le projet utilise babel pour uniformiser les imports entre ce qu'on fait côté front et côté back, et il utilise nodemon pour relancer automatiquement le projet à chaque fois qu'un fichier est modifié


## Existing routes
* GET /api/student -> renvoie tous les students
* GET /api/student?search=truc -> renvoie les students ayant "truc" dans leur name/firstName/birthDate
* GET /api/student/1 -> renvoie le student dont l'id est 1
* POST /api/student -> ajoute un student en bdd
* DELETE /api/student -> supprime le student dont l'id est 1