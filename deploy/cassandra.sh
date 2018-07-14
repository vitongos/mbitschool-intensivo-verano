#!/bin/bash

docker run -d -v /home/centos/nosql-src:/nosql --name cassandra1 cassandra:3.11

sleep 20

docker run -d -e CASSANDRA_SEEDS="$(docker inspect --format='{{ .NetworkSettings.IPAddress }}' cassandra1)"  -v /home/centos/nosql-src:/nosql --name cassandra2 cassandra:3.11
