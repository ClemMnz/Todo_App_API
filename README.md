# Todo_App_API
Backend of Todo_App

## Challenge GLADIA

### Configuration et lancement de l'application

Il faut d'abord créer un fichier .env à la racine du repo Todo_App_API, avec les variables suivantes: 

- PORT= 
- AUTH0_AUDIENCE=''
- AUTH0_DOMAIN='' 
- DATABASE_LOCAL='mongodb://localhost:27017/VOTRENOMDEDATABASE'
- AUTH0_ISSUER => 'https://DOMAINE'

Dans le répertoire Middlewares , le fichier checkJwt, la variable jwtURI à modifier en mettant son ISSUER.

Dans le repo 
Todo_App_Client , il y a le fichier 'config.js' à modifier qui se trouve dans le répertoire 'utils':

- AUTH0_AUDIENCE 
- AUTH0_DOMAIN 
- AUTH0_CLIENT_ID
- API_URL= "http://localhost:5000/api/";


Il faut avoir MongoDB sur sa machine, ensuite pour l'exécuter, entrez la commande suivante dans un terminal: 

- ```mongod```

Pour lancer l'application  côté client, il faut aller dans le répertoire "frontend" et entrez les commandes suivantes dans un second termninal: 

- ```yarn install```
- ```yarn start```
 
Se placer ensuite dans le répertoire "backend" et entrez les commandes suivantes dans un troisème terminal: 

- ```npm install```
- ```npm run dev```


##### Bonne visite!



