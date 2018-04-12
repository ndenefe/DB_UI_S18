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
    method: 'GET',
    path: '/election',
    handler: function (request, reply) {
        console.log('Server processing a /election request');
        connection.query('SELECT positionId, dateTime, city,state FROM `elections`', function (error, results, fields) {
            if (error)
                throw error;
            reply (results);

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
            if(results.length==1)
                reply (results);
            else
                reply("The people you are looking for doesn't enroll this election. ");

        });
    }
});

server.route({
    method: 'GET',
    path: '/election/{name}',
    handler: function (request, reply) {
        console.log('Server processing a /searchElection request');
        connection.query('SELECT firstName,lastName, positionId, dateTime, city,state FROM `politicians` NATURAL JOIN `candidates` NATURAL JOIN `elections` WHERE (`firstName`=? OR `lastName`=?)', [request.params.name,request.params.name], function (error, results, fields) {
            if (error)
                throw error;
            if(results.length>=1)
                reply (results);
            else
                reply("The people you are looking for doesn't enroll any election. ");

        });
    }
});

server.route({
    method: 'GET',
    path: '/login/{user}/{pass}',
    handler: function (request, reply) {
        console.log('Server processing a /login request');

        connection.query('SELECT * FROM `politicians` WHERE `username` =? AND `password` = ? ', [request.params.user,request.params.pass],function (error, results, fields) {
            if (error)
                throw error;
            
            connection.query(' SELECT * FROM `nonPolitician` WHERE `username` =? AND `password` = ?', [request.params.user,request.params.pass],function (error, results2, fields) {
            if (error)
                throw error;
            else{
		if(results.length==1){
			reply('Hello '+results[0].firstName+' '+results[0].lastName);
		}
                else if(results2.length==1){
                    reply('Hello '+results2[0].firstName+' '+results2[0].lastName);
                    if(results2[0].favorites != 'null'){
                        connection.query('SELECT firstName,lastName, positionId, dateTime, city,state FROM `politicians` NATURAL JOIN `candidates` NATURAL JOIN `elections` WHERE polId=?', [results2[0].favorite], function (error, results3, fields) {
                        if (error)
                            throw error;
                        if(results3.length>=1){
                            reply("Here is your favorite politician's upcoming election: ")
                            reply (results3);
                        }
			
                    });
		}
		else
			reply('Cannot find account, try it again.');
	    }
         }
        });
        });
    }
});

server.route({
    method: 'PUT',
    path: '/login/favor/{user}/{pass}/{pol}',
    handler: function (request, reply) {
        console.log('Server processing a /login request');

        connection.query('SELECT * FROM `nonPolitician` WHERE `username` =? AND `password` = ? ', [request.params.user,request.params.pass],function (error, results, fields) {
            if (error)
                throw error;
            
            if(results.length==1){
                connection.query('SELECT polId FROM `politicians` WHERE `firstName`=? OR `lastName`=?', [request.params.pol,request.params.pol], function (error, results2, fields) {
                if (error)
                    throw error;
                if(results2.length==1){
                    connection.query('UPDATE `nonPolitician` SET `favorites`=? WHERE `username` =? AND `password` = ?', [results2[0].polId,request.params.user,request.params.pass], function (error, results3, fields) {
                    if (error)
                        throw error;
                    reply (' successfully updated'+request.params.pol+' to favorite!');

        });
                }
                else
                    reply('Cannot find the politician, try another name.');

            });
            }
            else
		reply('Cannot find account, try it again.');
        });
    }
});

server.route({
    method: 'GET',
    path: '/login/profile/{user}/{pass}',
    handler: function (request, reply) {
        console.log('Server processing a /login and profile request');

        connection.query('SELECT username, email, picture, firstName, lastName, partyId, phone, website, platformId FROM `politicians` WHERE `username` =? AND `password` = ? ', [request.params.user,request.params.pass],function (error, results, fields) {
            if (error)
                throw error;
            
            connection.query(' SELECT username,email,picture,firstName,lastName,phone,favorites FROM `nonPolitician` WHERE `username` =? AND `password` = ?', [request.params.user,request.params.pass],function (error, results2, fields) {
            if (error)
                throw error;
            else{
		if(results.length==1){
			reply(results);
		}
                else if(results2.length==1){
			reply(results2);
		}
		else
			reply('Cannot find account, try it again.');
	    }
        });
        });
    }
});

server.route({
    method: 'PUT',
    path: '/login/profile/update/{user}/{pass}',
    handler: function (request, reply) {
        console.log('Server processing a /login and profile request');

        connection.query('SELECT * FROM `politicians` WHERE `username` =? AND `password` = ? ', [request.params.user,request.params.pass],function (error, results, fields) {
            if (error)
                throw error;
            
            connection.query(' SELECT * FROM `nonPolitician` WHERE `username` =? AND `password` = ?', [request.params.user,request.params.pass],function (error, results2, fields) {
            if (error)
                throw error;
            else{
		if(results.length==1){
			connection.query('UPDATE `politicians` SET `email`=?,`picture`=?,`phone`=?,`website`=? WHERE `username` =? AND `password` = ?', [request.payload['email'],request.payload['piture'],request.payload['phone'],request.payload['website'],request.params.user,request.params.pass],function (error, results, fields) {
                            if (error)
                                throw error;
                            reply('update successful!');
                        });
		}
                else if(results2.length==1){
			connection.query('UPDATE `nonPolitician` SET `email`=?,`picture`=?,`phone`=? WHERE `username` =? AND `password` = ?', [request.payload['email'],request.payload['piture'],request.payload['phone'],request.params.user,request.params.pass],function (error, results, fields) {
                            if (error)
                                throw error;
                            reply('update successful!');
                        });
		}
		else
			reply('Cannot find account, try it again.');
	    }
        });
        });
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
