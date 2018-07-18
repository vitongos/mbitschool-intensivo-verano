// ***
// En la colección mkt.registerTiny:
//   - Buscar todos los registros de New Haven en plataforma iPad
//   - Buscar los 10 documentos con mayor número de prints
use mkt;

db.registerTiny.find({platform: "iPad", city: "New Haven"});

db.registerTiny.find().sort({prints: -1}).limit(10);


// ***
// ¿Qué índices nos servirían para mejorar las siguientes consultas?
// db.register.find().sort({net:-1})
// db.register.find(
//    {city: "New Haven", platform: "iPad"}
// )

db.register.createIndex({net: -1}, {background: true})
// También funcionaría este: 
// db.registerTiny.createIndex({net: 1})

db.register.createIndex({city: 1, platform: 1}, {background: true})
// También funcionaría este, aunque parcialmente: 
// db.register.createIndex({city: 1}, {background: true})


// ***
// Map-Reduce
// Contar el número de documentos con CTR > 1% el 1 de junio
//     % CTR = clicks * 100 / prints

var map = function () { 
    if (this.clicks*100/this.prints > 1) {
        emit("count", 1);
    }
}

var reduce = function (k, v) { 
    return Array.sum(v);
}

db.register.mapReduce(
    map,
    reduce, 
    { 
        query: { date : ISODate("2017-06-01") }, 
        out : "output_ctr" 
    }
);

// Contar el número de documentos con CTR > 1% por plataforma

var map = function () { 
    if (this.clicks*100/this.prints > 1) {
        emit(this.platform, 1);
    }
}

var reduce = function (k, v) { 
    return Array.sum(v);
}

db.register.mapReduce(
    map,
    reduce, 
    { 
        query: { date : ISODate("2017-06-01") }, 
        out : "output_ctr" 
    }
);

// ¿Se podría mejorar con un índice?

db.register.createIndex({date: 1}, {background: true})


// ***
// ¿Cómo obtener las 10 combinaciones de ciudad-plataforma con mejor performance?
//     Performance = net / prints

db.register.aggregate( [
    { $project : {city: 1, platform: 1, net: 1, prints: 1} },
    { $group: { _id : { city: "$city", platform: "$platform" }, n: { $sum: "$net" }, p : { $sum: "$prints" } } },
    { $project: { _id: 1, performance: { $divide: [ "$n", "$p" ] } } },
    { $sort : { performance: -1 }}
])

// Obtener el mismo resultado pero sólo para las noches (21:00 - 23:59)

db.register.createIndex({ hour: 1 }, {background: true})

db.register.aggregate( [
    { $match : { hour: { $gte : 21 }}},
    { $project : {city: 1, platform: 1, net: 1, prints: 1} },
    { $group: { _id : { city: "$city", platform: "$platform" }, n: { $sum: "$net" }, p : { $sum: "$prints" } } },
    { $project: { _id: 1, performance: { $divide: [ "$n", "$p" ] } } },
    { $sort : { performance: -1 }}
])


/***
Necesitamos diseñar una base de datos con los clientes de una compañía de seguros de salud.

De cada cliente tenemos:
- DNI, Nombre, Apellidos, Sexo, Edad, Ciudad, Doctor asignado
- Cuenta: Pago total, Gasto total y Saldo
- Histórico por especialidad: cantidad de consultas y valoración (1 a 10: 1 sano, 10 enfermo)

De cada Doctor tenemos el Nombre, Apellidos y Dirección.

DATOS IMPORTADOS:

Database: clients

Collection: clients

Documento tipo:
{
	"_id" : ObjectId("5b4e286bf917c095983529a3"),
	"dni" : "69207525V",
	"name" : "Matthew",
	"surname" : "Shaw",
	"gender" : "M",
	"age" : 70,
	"city" : "Savannah",
	"doctor" : {
		"name" : "Doctor 837",
		"address" : "Address 837"
	},
	"pagos" : 8367,
	"gastos" : 2336,
	"specialties" : [
		{
			"name" : "Estomatología",
			"citas" : 6,
			"valoracion" : 10
		},
		{
			"name" : "Venereología",
			"citas" : 7,
			"valoracion" : 2
		},
		{
			"name" : "Otorrinolaringología",
			"citas" : 7,
			"valoracion" : 7
		},
		{
			"name" : "Dermatología",
			"citas" : 1,
			"valoracion" : 2
		},
		{
			"name" : "Cirugía vascular",
			"citas" : 4,
			"valoracion" : 6
		}
	]
}
***/

// Buscar un cliente por nombre y apellidos para obtener su estado de cuentas 

use clients;

db.clients.find(
    {name : "Marine", surname : "Valentine"},
    {pagos: 1, gastos: 1, _id: 0}
).limit(1);

// Adicionar pagos o gastos a un cliente 

db.clients.update(
    {name : "Marine", surname : "Valentine"},
    {$inc : { pagos: 100, gastos: 50}}
);

// Obtener el saldo actual de la compañía

db.clients.mapReduce(
    function() {
        emit( "saldo", this.pagos - this.gastos );
    },
    function(k, v) {
        return Array.sum( v );
    },
    {
        out: "saldo"
    }
);

// Obtener nombre y dirección del doctor con mayor saldo a favor

// Obtener la ciudad con mayor riesgo para una especialidad dada
//     Riesgo = Valoración promedio / Saldo promedio
