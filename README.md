Demos y fuentes del módulo Bases de Datos NoSQL
===============================================

Instalación
-----------

A continuación se especifica el proceso de instalación de los sistemas necesarios en el taller.

### Instalar el repositorio clonándolo de Github:
Ejecutar el siguiente script en un terminal:
```bash
sudo yum -y install git
cd
git clone https://github.com/vitongos/mbitschool-intensivo-verano.git nosql-src
chmod +x nosql-src/deploy/*.sh
sudo -i
cd /home/centos/nosql-src/deploy
./setup.sh
```
