Dataset ejemplo
===============

Setup MongoDB
-------------

### Restaurar la colección registerTiny
Ejecutar en un terminal:
```bash
cd /home/centos/data
tar xvf registerTiny.json.gz
mongoimport -d test -c registerTiny registerTiny.json
rm registerTiny.json
```

### Restaurar la colección register
Ejecutar en un terminal:
```bash
cd /home/centos/data
tar xvf register.json.gz
mongorestore -d test -c registerTiny test/register.bson
rm -rf test
```


