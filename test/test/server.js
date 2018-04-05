'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000, host: '0.0.0.0' });

//Initialize the mysql variable and create the connection object with necessary values
//Uses the https://www.npmjs.com/package/mysql package.
var mysql      = require('mysql');
var connection = mysql.createConnection({

    //host will be the name of the service from the docker-compose file. 
    host     : 'mysql',
    user     : 'root',
    password : 'password',
    database : 'DB_Lab'
});

connection.connect();

server.route({
    method: 'POST',
    path: '/user',
    handler: function(request,reply){
        reply('User Added: ' + request.payload['lName']+ ', ' + request.payload['fName']);
    }
});
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('Server processing a / request');
        reply('Helloo, world!');
    }
});

//A new route to test connectivity to MySQL
server.route({
    method: 'GET',
    path: '/getData',
    handler: function (request, reply) {
        console.log('Server processing a /getData request');

        connection.query('SELECT username, password FROM nonPolitician', function (error, results, fields) {
            if (error)
                throw error;
            reply (results);

        });
    }
});
//A new route to test connectivity to MySQL
server.route({
    method: 'GET',
    path: '/nonPol',
    handler: function (request, reply) {
        console.log('Server processing a /nonPol request');

        //Does a simple select, not from a table, but essentially just uses MySQL
        //to add 1 + 1.
        //function (error, results, fields){...} is a call-back function that the
        //MySQL lib uses to send info back such as if there was an error, and/or the
        //actual results.
        connection.query('SELECT firstName, lastName, email FROM nonPolitician', function (error, results, fields) {
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);

            //for exemplar purposes, stores the returned value in a variable to be
        });
    }
});
server.route({
    method: 'POST',
    path: '/insertData',
    handler: function (request, reply) {
        console.log('Server processing a /insertData request');
	
        connection.query('INSERT INTO `party` SET `partyId`=?, `partyName`=?', [request.payload['partyId'],request.payload['partyName']],function (error, results, fields) {
            if (error)
                throw error;
        });
    }
});

server.route({
    method: 'PUT',
    path: '/updateData',
    handler: function (request, reply) {
        console.log('Server processing a /insertData request');
	
        connection.query('UPDATE `party` SET `partyName`=? WHERE `partyId`=?', [request.payload['partyName'],request.payload['partyId']],function (error, results, fields) {
            if (error)
                throw error;
        });
    }
});

server.route({
    method: 'DELETE',
    path: '/deleteData',
    handler: function (request, reply) {
        console.log('Server processing a /insertData request');
	
        connection.query('DELETE FROM `party` WHERE `partyID`=?', request.payload['partyId'],function (error, results, fields) {
            if (error)
                throw error;
        });
    }
});

server.route({
    method: 'GET',
    path: '/getParty',
    handler: function (request, reply) {
        console.log('Server processing a /getData request');

        connection.query('SELECT partyId, partyName FROM party', function (error, results, fields) {
            if (error)
                throw error;
            reply (results);

        });
    }
});

//A new route to test connectivity to MySQL
server.route({
    method: 'GET',
    path: '/pol',
    handler: function (request, reply) {
        console.log('Server processing a /pol request');

        //Does a simple select, not from a table, but essentially just uses MySQL
        //to add 1 + 1.
        //function (error, results, fields){...} is a call-back function that the
        //MySQL lib uses to send info back such as if there was an error, and/or the
        //actual results.
        connection.query('SELECT firstName, lastName, email FROM politicians', function (error, results, fields) {
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);

            //for exemplar purposes, stores the returned value in a variable to be
        });
    }
});



/*server.route({
    method: 'GET',
    path:'/login{uName}{pWord}',
    handler: function (request, reply){
        console.log('Server processing a /getData request');
        const uName=request.params.uName;
        const pWord=request.params.pWord;
        connection.query('SELECT firstName, lastName FROM politicians p WHERE p.username=${uName} && p.password=${pWord}', function (error, results, fields) {
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);

            //for exemplar purposes, stores the returned value in a variable to be
        });
    
    }
});*/

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        console.log('Server processing /name request');
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
