import sys
from neo4j.v1 import GraphDatabase, basic_auth
driver = GraphDatabase.driver("bolt://localhost", auth=basic_auth("", ""))
session = driver.session()
code = sys.argv[1]

result = session.run(
  "MATCH (a:Airport { code: {param1} }) RETURN a.city as city",
  {"param1":code}
)
for record in result:
  print("El vuelo desde %s debe ir a: <TO-DO>" % (record["city"]))

session.close()
