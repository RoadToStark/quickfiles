# DOCUMENTATION API

## Users

### Inscription d'un utilisateur

**POST**  ``` /api/signup``` 

**Headers**

```
    Content-Type : application/json
```
Ou
```
    Content-Type: application/x-www-form-urlencoded 
```
**Paramètres**
```
email : String
password : String
```
**Retour**

*Objet User si succeès*
```
        {
            "_id": "53fa11e5d83a0bcb1b4682d1",
            "__v": 0,
            "local": {
                "email": "sami.triki@gmail.com"
            }
        }
```
*Erreur sinon*
```
{
    "success": false,
    "message": "That email is already taken."
}
```

### Update d'un utilisateur

**PUT**  ``` /api/users/:user_id``` 

**Headers**

```
    Content-Type : application/json
```
Ou
```
    Content-Type: application/x-www-form-urlencoded 
```
**Paramètres (facultatifs)**
```
email : String
username : String

```
**Retour**
```
Si success
{
    "success": true,
    "message": "User successfuly updated",
    "user": {
        "username": "Stark",
        "_id": "5401d54f0e56fa8f40951b59",
        "__v": 0,
        "local": {
            "password": "$2a$08$7rlcRncBRJli1E0fugGH2uj68ZGeO7VmQG9XD5XPxMXZLWWpOjd3a",
            "email": "lucas.bedout@free.fr"
        }
    }
}
```
Si erreur
```
{
    "message": "Cast to ObjectId failed for value \"5401d54e56fa8f40951b59\" at path \"_id\"",
    "name": "CastError",
    "type": "ObjectId",
    "value": "5401d54e56fa8f40951b59",
    "path": "_id"
}
```
### Récupération des infos d'un utilisateur

*L'utilisateur courant doit correspondre à l'utilisateur récupéré  (le passage de l'utilisateur est une sécurité)*

**GET**  ``` /api/users/:user_id``` 

**Headers**

```
    Content-Type : application/json
```

**Paramètres (obligatoires) **
```
{
        "user" : {
            "_id": "53fa11e5d83a0bcb1b4682d1",
            "__v": 0,
            "local": {
                "email": "sami.triki@gmail.com"
            }
        }
    }
```

**Retour** 

L'objet User correspondant 

### Récupération des fichiers d'un utilisateur

*L'utilisateur courant doit correspondre à l'utilisateur récupéré*

**GET**  ``` /api/users/:user_id/files``` 

**Headers**

```
    Content-Type : application/json
```

**Paramètres (obligatoires) **
```
{
        "user" : {
            "_id": "53fa11e5d83a0bcb1b4682d1",
            "__v": 0,
            "local": {
                "email": "sami.triki@gmail.com"
            }
        }
    }
```

**Retour**
*La requête retourne un tableau d'objets File non enveloppé*
```
[
    {
        "_id": "5401d5bb0e56fa8f40951b5a",
        "owner": "5401d54f0e56fa8f40951b59",
        "__v": 0,
        "lastModified": "2014-08-30T13:47:58.220Z",
        "link": "http://localhost:8080/api/5401d5bb0e56fa8f40951b5a",
        "name": "IMG_7576.JPG",
        "path": "media/5401d54f0e56fa8f40951b59/5401d5bb0e56fa8f40951b5a.JPG",
        "size": 3979445,
        "type": "image/jpeg"
    }
]
```
## Fichiers

### Création d'un fichier en base de données

*Cette action ne doit jamais être effectuée en dehors du cadre de l'upload*

**POST**  ``` /api/files``` 

**Headers**

```
    Content-Type : application/json
```

**Paramètres (facultatifs) **
```
{
        "user" : {
            "_id": "53fa11e5d83a0bcb1b4682d1",
            "__v": 0,
            "local": {
                "email": "sami.triki@gmail.com"
            }
        }
    }
```

**Réponse** 

```
{
    "success": true, // si la création est ok, sinon false
    "file": {
        "owner": "53fa11e5d83a0bcb1b4682d1", // si l'user a été passé
        "_id": "53ff9af79ab6d077521c8b74"
    }
    "message" : "Message d'erreur si erreur il y a" // uniquement s'il y a une erreur
}
```
*Si le paramètre user n'est pas passé/est erroné, le fichier sera anonyme*

## Upload

*Guide de demande d'upload sur l'API, les actions sont à faire dans l'ordre.*

**POST**  ``` /api/files``` 

**Headers** 

``` 
    Content-Type : application/json
```

**Paramètres** 

``` 
    Facultatif : Objet utilisateur courant : 
    {
        "user" : {
            "_id": "53fa11e5d83a0bcb1b4682d1",
            "__v": 0,
            "local": {
                "password": "$2a$08$i/meFJfFd9HnvKiVDS6vvOc6mJKc2a7M3YjAs0ThdV.NuzcUwhbCu",
                "email": "sami.triki@gmail.com"
            }
        }
    }
```

**Réponse** 

```
{
    "success": true, // si la création est ok, sinon false
    "file": {
        "owner": "53fa11e5d83a0bcb1b4682d1", // si l'user a été passé
        "_id": "53ff9af79ab6d077521c8b74"
    }
    "message" : "Message d'erreur si erreur il y a" // uniquement s'il y a une erreur
}
```

**POST** ```  /api/upload```

**Headers** 

``` 
    Pas besoin, mais les données doivent être passées en multipart/form-data
```

**Paramètres** 

``` 
    Obligatoires : 
      * _id renvoyé par la précédente requête
      * fichier à uploader 
```

**Réponse success (l'objet file)**

```
{
    "link": "http://quickfil.es/ef9898dfg0877jfh765",
    "path": "media/53fa11e5d83a0bcb1b4682d1/53ff9af79ab6d077521c8b74.JPG",
    "size": 2003403,
    "lastModified": "2014-08-28T21:24:20.301Z",
    "type": "image/jpeg",
    "name": "IMG_0792.JPG",
    "owner": "53fa11e5d83a0bcb1b4682d1",
    "_id": "53ff9af79ab6d077521c8b74",
    "__v": 0
}
```
**Réponse erreur (exemple)**
```
{
    "success" : false,
    error: {
        "message": "Cast to ObjectId failed for value \"53ff8395fb505e7e5ff4\" at path \"_id\"",
        "name": "CastError",
        "type": "ObjectId",
        "value": "53ff8395fb505e7e5ff4",
        "path": "_id"
    }
}
```

Les codes d'erreur sont les suivants 

Mauvais paramètres : **422**
Erreur serveur : **500**

