Script 1

Changes =>

Create duckList function: separate  
Create SearchDucks function ==== (script 3 => idDucks)

submit -> listDuck + searchDucks

Script 2

Create painDucks =>

logic: a firstDucks/listDucks

Script 3 

create idDucks

change añadir dos parametros en vez de uno =>  
            link.addEventListener('click', function(){detailDuck(duck.id)}); 

to =>       link.addEventListener('click', function (event) {
            var id = duck.id;

            retrieveDuck(id, paintDetail);
            });

            change url 
Script 4 