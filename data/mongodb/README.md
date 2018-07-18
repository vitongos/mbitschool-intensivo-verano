Dataset ejemplo
===============

Setup MongoDB
-------------

### Restaurar la colección registerTiny
Ejecutar en un terminal:
```bash
cd /home/centos/nosql-src/data/mongodb
gunzip registerTiny.json.gz
mongoimport -d mkt -c registerTiny registerTiny.json
```

### Restaurar la colección register
Ejecutar en un terminal:
```bash
cd /home/centos/nosql-src/data/mongodb
gunzip register.bson.gz
gunzip register.metadata.json.gz
mongorestore -d mkt -c register register.bson
```

Soluciones a los problemas de MongoDB
-------------------------------------
 
 Las soluciones a los problemas pueden consultarse en el archivo **/home/centos/nosql-src/data/mongodb/solutions.js**

