'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000, host: '0.0.0.0' });
var mysql      = require('mysql');


var connection = mysql.createConnection({

    //host will be the name of the service from the docker-compose file. 
    host     : 'mysql',
    user     : 'root',
    password : 'password',
    database : 'DB_Lab'
});
connection.connect();

server.state('session',{
    ttl:60*1000*24*24,   // session time 1 day
    isSecure:false,
    encoding:'base64json',
    clearInvalid: true,
    strictHeader: false,

});



server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('Server processing a / request');
        reply('Welcome, please login.');
    }
});


server.route({
    method: 'GET',
    path: '/search/{name}',
    handler: function (request, reply) {
        console.log('Server processing a /search request');
        connection.query('SELECT firstName,lastName, email, picture, phone  FROM `nonPolitician` WHERE `firstName`=? OR `lastName`=?', [request.params.name,request.params.name], function (error, results, fields) {
            if (error)
                throw error;
            else{
                connection.query('SELECT firstName,lastName, email, picture, partyId, phone, website, platformId FROM `politicians` WHERE `firstName`=? OR `lastName`=?', [request.params.name,request.params.name], function (error, results2, fields) {
                    if (error)
                        throw error;
                    else{
                        if(results)
                            reply('politician results: '+results);
                        else if(results2)
                            reply('nonpolitician results: '+results);
                    }

                });
            }
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
            if(results)
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
    method: ['POST','GET'],
    path: '/login',
    handler: function (request, reply) {
        let cookie =request.state.session;
        console.log('Server processing a /login request');
        if(cookie){
            cookie.lastVisit=Date.now();
            return reply.redirect('/login/userpage').state('session',cookie);
        }
        connection.query('SELECT * FROM `politicians` WHERE `username` =? AND `password` = ? ', [request.payload['username'],request.payload['password']],function (error, results, fields) {
            if (error)
                throw error;
            
            connection.query(' SELECT * FROM `nonPolitician` WHERE `username` =? AND `password` = ?', [request.payload['username'],request.payload['password']],function (error, results2, fields) {
            if (error)
                throw error;
            else{
		if(results.length==1){
                    var users=request.payload['username'];
                    var passs=request.payload['password'];
                    if(!cookie){
                        cookie={
                            username:users,
                            password:passs
                        };
                    }
                    
                    cookie.lastVisit=Date.now();
                    return reply.redirect('/login/userpage').state('session',cookie);
		}
                else if(results2.length==1){
                    var users=request.payload['username'];
                    var passs=request.payload['password'];
                    if(!cookie){
                        cookie={
                            username:users,
                            password:passs
                        };
                    }
                    cookie.lastVisit=Date.now();
                    return reply.redirect('/login/userpage').state('session',cookie);
                    
                }
		else{
                    cookie.lastVisit=Date.now();
                    return reply('Cannot find account, try it again.');
                }
	    }
            
            
        });
        });
    },
        config: {
        state: {
            parse: true,        // parse cookies and store in request.state
            failAction: 'error' // may also be 'ignore' or 'log'
            }
        }
    
    
});


server.route({
    method: 'GET',
    path: '/login/userpage',
    handler: function (request, reply) {
        console.log('Server processing a /login and profile request');
        let cookie = request.state.session; 
        if(!cookie){
            reply.redirect('/');
        }
        else{
        var userr=cookie.username;
        var pass=cookie.password;
        connection.query('SELECT firstName, lastName FROM `politicians` WHERE `username` =? AND `password` = ? ', [userr,pass],function (error, results, fields) {
            if (error)
                throw error;
            
            connection.query(' SELECT firstName,lastName FROM `nonPolitician` WHERE `username` =? AND `password` = ?', [userr,pass],function (error, results2, fields) {
            if (error)
                throw error;
            else{
		if(results.length==1){
			reply('Hello '+results[0].firstName+' '+results[0].lastName);
		}
                else if(results2.length==1){
			reply('Hello '+results2[0].firstName+' '+results2[0].lastName);
		}
	    }
        });
        });
    }},
        config: {
        state: {
            parse: true,        // parse cookies and store in request.state
            failAction: 'error' // may also be 'ignore' or 'log'
            }
        }
});

server.route({
    method: 'GET',
    path: '/login/profile',
    handler: function (request, reply) {
        console.log('Server processing a /login and profile request');
        let cookie = request.state.session; 
        if(!cookie){
            reply.redirect('/');
        }
        else{
        var userr=cookie.username;
        var pass=cookie.password;
        connection.query('SELECT username, email, picture, firstName, lastName, partyId, phone, website, platformId FROM `politicians` WHERE `username` =? AND `password` = ? ', [userr,pass],function (error, results, fields) {
            if (error)
                throw error;
            
            connection.query(' SELECT username,email,picture,firstName,lastName,phone,favorites FROM `nonPolitician` WHERE `username` =? AND `password` = ?', [userr,pass],function (error, results2, fields) {
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
    }},
        config: {
        state: {
            parse: true,        // parse cookies and store in request.state
            failAction: 'error' // may also be 'ignore' or 'log'
            }
        }
});

server.route({
    method: 'GET',
    path: '/logout',
    handler: function (request, reply) {
        console.log('Server processing a /logout');
        let cookie = request.state.session; 
        reply.redirect('/').unstate('session');  // delete session and redirect to default page
    }
});




server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
