CREATE KEYSPACE test 
WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 2 };

USE test;

CREATE TABLE products (
    provider text,
    name text,
    colors set<text>,
    description text,
    sizes set<int>,
    website text,
    PRIMARY KEY (provider, name)
);

CREATE TYPE valoration (
    user text,
    number tinyint,
    message text
);

CREATE TYPE promotion (
    country text,
    description text
);

ALTER TABLE products ADD (
    valorations set< frozen< valoration > >,
    promotions set< frozen< promotion > >
);

ALTER TABLE products ADD (
    prices set< frozen< tuple< text, set< frozen< tuple< int, decimal > > > > > >
);

CREATE TABLE catalog (
    name text,
    description text,
    variants list< frozen < tuple <text, text > > >,
    promotions set< frozen <tuple <text, int > > >,
    rates list< int >,
    stock set< frozen <tuple <text, text, text, int > > >,
    prices set< frozen <tuple <text, text, text, decimal > > >,
    PRIMARY KEY (name)
);

COPY catalog (
  name, 
  description, 
  variants, 
  promotions, 
  rates, 
  stock, 
  prices
) 
FROM '/nosql/data/cassandra/products.csv' 
WITH DELIMITER = ';'
AND HEADER = true;
