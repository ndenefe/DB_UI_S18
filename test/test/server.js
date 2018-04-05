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
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('Server processing a / request');
        reply('Hello, world!');
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
    method: 'GET',
    path: '/pol',
    handler: function (request, reply) {
        console.log('Server processing a /pol request');
        connection.query('SELECT firstName, lastName, email FROM politicians', function (error, results, fields) {
            if (error)
                throw error;
            reply (results);

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
	    reply('insert successful!');
        });
    }
});

server.route({
    method: 'PUT',
    path: '/updateData',
    handler: function (request, reply) {
        console.log('Server processing a /updateData request');
	
        connection.query('UPDATE `party` SET `partyName`=? WHERE `partyId`=?', [request.payload['partyName'],request.payload['partyId']],function (error, results, fields) {
            if (error)
                throw error;
	    reply('update successful!');
        });
    }
});

server.route({
    method: 'DELETE',
    path: '/deleteData',
    handler: function (request, reply) {
        console.log('Server processing a /deleteData request');
	
        connection.query('DELETE FROM `party` WHERE `partyID`=?', request.payload['partyId'],function (error, results, fields) {
            if (error)
                throw error;
	    reply('delete successful!');
        });
    }
});

server.route({
    method: 'GET',
    path: '/getParty',
    handler: function (request, reply) {
        console.log('Server processing a /getParty request');

        connection.query('SELECT partyId, partyName FROM party', function (error, results, fields) {
            if (error)
                throw error;
            reply (results);

        });
    }
});

server.route({
    method: 'POST',
    path: '/login/nonPol',
    handler: function (request, reply) {
        console.log('Server processing a /login request');

        connection.query('SELECT * FROM `nonPolitician` WHERE `username` =? AND `password` = ?', [request.payload['username'],request.payload['password']],function (error, results, fields) {
            if (error)
                throw error;
            else{
		if(results.length==1){
			reply('Hello '+results[0].firstName+' '+results[0].lastName);
		}
		else
			reply('Cannot find account, try it again.');
	    }

        });
    }
});

server.route({
    method: 'POST',
    path: '/login/pol',
    handler: function (request, reply) {
        console.log('Server processing a /login request');

        connection.query('SELECT * FROM `politicians` WHERE `username` =? AND `password` = ?', [request.payload['username'],request.payload['password']],function (error, results, fields) {
            if (error)
                throw error;
            else{
		if(results.length==1){
			reply('Hello '+results[0].firstName+' '+results[0].lastName);
		}
		else
			reply('Cannot find account, try it again.');
	    }

        });
    }
});


server.route({
    method: 'GET',
    path: '/search/pol/{name}',
    handler: function (request, reply) {
        console.log('Server processing a /search request');
        connection.query('SELECT firstName,lastName, email, picture, partyId, phone, website, platformId FROM `politicians` WHERE `firstName`=? OR `lastName`=?', [request.params.name,request.params.name], function (error, results, fields) {
            if (error)
                throw error;
            reply (results);

        });
    }
});
server.route({
    method: 'GET',
    path: '/search/nonPol/{name}',
    handler: function (request, reply) {
        console.log('Server processing a /search request');
        connection.query('SELECT firstName,lastName, email, picture, phone  FROM `nonPolitician` WHERE `firstName`=? OR `lastName`=?', [request.params.name,request.params.name], function (error, results, fields) {
            if (error)
                throw error;
            reply (results);

        });
    }
});
server.route({
    method: 'POST',
    path: '/insertCandi',
    handler: function (request, reply) {
        console.log('Server processing a /insertCandi request');
	
        connection.query('INSERT INTO `candidates` SET `electionId`=?, `polId`=?', [request.payload['electionId'],request.payload['polId']],function (error, results, fields) {
            if (error)
                throw error;
	    reply('insert successful!');
        });
    }
});

server.route({
    method: 'GET',
    path: '/{election}/{name}',
    handler: function (request, reply) {
        console.log('Server processing a /searchElection request');
        connection.query('SELECT firstName,lastName, email, picture, partyId, phone, website, dateTime, city,state FROM `politicians` NATURAL JOIN `candidates` NATURAL JOIN `elections` WHERE `electionId`=? AND (`firstName`=? OR `lastName`=?)', [request.params.election,request.params.name,request.params.name], function (error, results, fields) {
            if (error)
                throw error;
            reply (results);

        });
    }
});




server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
