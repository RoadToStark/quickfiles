# DOCUMENTATION API

# Upload

Guide de demande d'upload sur l'API, les actions sont à faire dans l'ordre.

**POST**  ``` /api/files``` 

Headers 

``` 
    Content-Type : application/json
```

Paramètres 

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

Réponse 

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

Headers 

``` 
    Pas besoin, mais les données doivent être passées en multipart/form-data
```

Paramètres 

``` 
    Obligatoires : 
      * _id renvoyé par la précédente requête
      * fichier à uploader 
```

Réponse success (l'objet file)

```
{
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
Réponse erreur (exemple)
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


