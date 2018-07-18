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

