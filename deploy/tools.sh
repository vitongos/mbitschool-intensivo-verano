#!/bin/bash


systemctl stop packagekit
yum remove -y PackageKit
cd /tmp
wget http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-10.noarch.rpm
rpm -ihv epel-release-7-10.noarch.rpm
yum install -y htop
