install.packages("igraph")
install.packages("devtools", dependencies=TRUE)
devtools::install_github("nicolewhite/RNeo4j")

library(igraph)
library(RNeo4j)

#
# 1. Connect to database
#
graph <- startGraph("http://localhost:7474/db/data/")

#
# 2. Create igraph
#
query <- "MATCH (a:Actor)-->(m:Movie) RETURN a.name, m.title LIMIT 50"

edgelist <- cypher(graph, query)
g <- graph.data.frame(edgelist, directed = F)
g

#
# 3. Plot the graph
#
pdf('/home/centos/graph.pdf')
plot(g, 
	edge.color = 'Black',
	vertex.size = 10,
	vertex.label.cex = .8,
	layout = layout.fruchterman.reingold(g, niter = 10000))
dev.off()
