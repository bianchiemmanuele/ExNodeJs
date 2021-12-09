var express = require("express");
var apiServer = express();
var fs = require("fs");

// All'interno del apiServer è neccessario la porta, l'host e la funzione eseguia quando ascolta 

apiServer.listen(3000, "localhost", ()=>{
    console.log("server running at http://%s:%d", "localhost", 3000);
});

//tramite chrome andando su localhost:3000 il broswer non riescie a restituire nulla 
//perche non è presente niente e quindi è necessario usare il get
// request  permette di capire cosa chiede il client
// response permette di rispondere al client
//il metodo send permette di inviare dati al client

apiServer.get("/", (request, response)=> {
    console.log("Sono in get /", request);
    response.send("<H1>Ciao client </H1>");
});
apiServer.get("/nome", (request, response) => {
    nome = "Bianchi";
    console.log("richiesta get su nome");
    response.send("Ciao il mio nome è "+nome);
});
apiServer.get("/mioNome", (request, response) => {
    var nome = request.query.nome;
    console.log("richiesta get su nome");
    response.send("Ciao il mio nome è "+nome);
});
// https://localhost:3000/Somma?a=1&b=2
apiServer.get("/somma", (request, response) => {
    // var a = request.query.a;
    // var b = request.query.b;
    // var somma = parseInt(a)+parseInt(b) ;
    console.log("somma request "+ request.query);
    response.send("Somma: "+ (request.query.a - (- request.query.b)));
});

// https://localhost:3000/studenti?id=1
apiServer.get("/Studenti", (request, response) => {
    console.log("studenti id "+ request.query.id);
    //leggere il file
    fs.readFile("Studenti.json", (err, data) => {
        if(err){
            console.log("error" + err)
        }else{
            var studenti = JSON.parse(data);
            //console.log("studenti:" +  studenti[0].cognome);
           for(i = 0; i<studenti.length; i++){
            if(studenti[i].id == request.query.id){
                console.log("studenti:" +  studenti[i].nome +"  " + studenti[i].cognome);
                response.send("studente:" +" nome="+  studenti[i].nome +" cognome=" + studenti[i].cognome);
            }
           } 
        }

    });
});