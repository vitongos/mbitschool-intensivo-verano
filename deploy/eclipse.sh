#!/bin/bash

cd /tmp
wget http://ftp.snt.utwente.nl/pub/software/eclipse//technology/epp/downloads/release/photon/R/eclipse-jee-photon-R-linux-gtk-x86_64.tar.gz
mv eclipse-jee-photon-R-linux-gtk-x86_64.tar.gz /opt/
cd /opt
tar xzf eclipse-jee-photon-R-linux-gtk-x86_64.tar.gz
chown centos:centos eclipse -R
ln -s /opt/eclipse/eclipse /usr/bin/eclipse
