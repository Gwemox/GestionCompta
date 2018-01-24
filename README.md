Comment lancer le projet ?

Prérequis :
-MongoDB server (modifier dans app.js si necessaire)
-NodeJs
-npm
-gulp

1) Installer les dépendances
```
npm install
```

2) Utiliser GULP pour générer les fichiers CSS :

-Se placer dans le répertoire où ce trouve ce fichier README.MD, puis exécuter :
```
gulp
```

Si GULP n'est pas installé :
```
npm install -g gulp
```

**Une fois terminé, vous devriez trouver main.css dans le dossier /public/css/**


3) Lancer le serveur
```
npm start
```

Le programme créé automatiquement des données (User, Produits ...)

User :
    email : **admin@ynov.com**
    Mot de passe : **admin**

Routes protégées (CRUD) :

CRUD / API :
```
POST /api/order
GET /api/orders
GET /api/order/:id
PATCH /api/order/:id
DELETE /api/order/:id
POST /api/product
GET /api/products
GET /api/product/:id
PATCH /api/product/:id
DELETE /api/product/:id
POST /api/user
GET /api/users
GET /api/user/:id
PATCH /api/user/:id
DELETE /api/user/:id
```

VIEWS :
```
POST /order
POST /paid
GET /products
GET /product/:id
```

Routes non protégées :

CRUD / API :
```
POST /api/register
```

VIEWS :
```
GET /
GET /home
GET /login
GET /register
```