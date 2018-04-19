'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000, host: '0.0.0.0', routes: {
        cors: {
            origin: ["*"],
            headers: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type", "CORELATION_ID"],
            credentials: true
        }
    } 
});

//Initialize the mysql variable and create the connection object with necessary values
//Uses the https://www.npmjs.com/package/mysql package.
var mysql = require('mysql');

var pool  = mysql.createPool({
    //host will be the name of the service from the docker-compose file. 
    host     : 'mysql',
    user     : 'root',
    password : 'password',
    database : 'DB_Lab'
});


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
        reply('Hello, world!');
    }
});

//FULL TABLE GET ROUTES
server.route({
    method: 'GET',
    path: '/getFavorites',
    handler: function (request, reply) {
        console.log('Server processing a /getFavorites request');
        pool.query('SELECT * FROM `favorites`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
});

server.route({
    method: 'GET',
    path: '/getPhone',
    handler: function (request, reply) {
        console.log('Server processing a /getPhone request');
        pool.query('SELECT * FROM `phone`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
});

server.route({
    method: 'GET',
    path: '/getPlatform',
    handler: function (request, reply) {
        console.log('Server processing a /getPlatform request');
        pool.query('SELECT * FROM `platform`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
});

server.route({
    method: 'GET',
    path: '/getPictures',
    handler: function (request, reply) {
        console.log('Server processing a /getPictures request');
        pool.query('SELECT * FROM `pictures`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
});

server.route({
    method: 'GET',
    path: '/getParty',
    handler: function (request, reply) {
        console.log('Server processing a /getParty request');
        pool.query('SELECT * FROM `party`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
});

server.route({
    method: 'GET',
    path: '/getElections',
    handler: function (request, reply) {
        console.log('Server processing a /getElections request');
        pool.query('SELECT * FROM `elections`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
});

server.route({
    method: 'GET',
    path: '/getCandidates',
    handler: function (request, reply) {
        console.log('Server processing a /getCandidates request');
        pool.query('SELECT * FROM `candidates`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
});

server.route({
    method: 'GET',
    path: '/getPositions',
    handler: function (request, reply) {
        console.log('Server processing a /getPositions request');
        pool.query('SELECT * FROM `positions`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
});

server.route({
    method: 'GET',
    path: '/search/{name}',
    handler: function (request, reply) {
        console.log('Server processing a /search request');
        pool.query('SELECT firstName,lastName, email, picture, phone  FROM `nonPolitician` WHERE `firstName`=? OR `lastName`=?', [request.params.name,request.params.name], function (error, results, fields) {
            if (error)
                throw error;
            else{
                pool.query('SELECT firstName,lastName, email, picture, partyId, phone, website, platformId FROM `politicians` WHERE `firstName`=? OR `lastName`=?', [request.params.name,request.params.name], function (error, results2, fields) {
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


//A new route to test connectivity to MySQL
server.route({
    method: 'GET',
    path: '/getNonPol',
    handler: function (request, reply) {
        console.log('Server processing a /nonPol request');

        //Does a simple select, not from a table, but essentially just uses MySQL//
        //to add 1 + 1.
        //function (error, results, fields){...} is a call-back function that the
        //MySQL lib uses to send info back such as if there was an error, and/or the
        //actual results.
        pool.query('SELECT * FROM nonPolitician', function (error, results, fields) {
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
    path: '/getPol',
    handler: function (request, reply) {
        
        console.log('Server processing a /pol request');
        pool.query('SELECT * FROM politicians', function (error, results, fields) {
            if (error)
                throw error;
            reply (results);

        });
        
    }
});

server.route({
    method: 'POST',
    path: '/nonPol',
    handler: function(request, reply) {
        console.log('Server processing a /nonPol POST request');
        pool.query('INSERT INTO `nonPolitician` (`username`,`password`,`email`,`picture`,`firstName`,`lastName`,`phone`) VALUES(?, ?, ?, ?, ?, ?, ?)',
        [request.payload['username'],request.payload['password'],request.payload['email'],request.payload['picture'],request.payload['firstName'],
        request.payload['lastName'], request.payload['phone']],function (error, results, fields){
            if (error)
                throw error;
            reply (results);
        });
    }
});

server.route({
    method: 'POST',
    path: '/pol',
    handler: function(request, reply) {
        console.log('Server processing a /pol POST request');
        pool.query('INSERT INTO `politicians` (`username`,`password`,`email`,`picture`,`firstName`,`lastName`,`phone`,`partyId`,`website`,`platformId`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [request.payload['username'],request.payload['password'],request.payload['email'],request.payload['picture'],request.payload['firstName'],
        request.payload['lastName'], request.payload['phone'],request.payload['partyId'],request.payload['website'],request.payload['platformId']],
        function (error, results, fields){
            if (error)
                throw error;
            reply (results);
        });
    }
});

server.route({
    method: 'PUT',
    path: '/nonPol/creds',
    handler: function(request, reply) {
        console.log('Server processing a /nonPol credential PUT request');
        pool.query('UPDATE `nonPolitician` SET `username` = ?, `password` = ? WHERE `userId` = ?',
        [request.payload['username'],request.payload['password'],request.payload['userId']], function (error, results, fields) {
            if (error)
                throw error;
            reply (results);
        });        
    }
});
server.route({
    method: 'PUT',
    path: '/pol/creds',
    handler: function(request, reply) {
        console.log('Server processing a /pol credential PUT request');
        pool.query('UPDATE `politicians` SET `username` = ?, `password` = ? WHERE `polId` = ?',
        [request.payload['username'],request.payload['password'],request.payload['polId']], function (error, results, fields) {
            if (error)
                throw error;
            reply (results);
        });        
    }
});
server.route({
    method: 'PUT',
    path: '/nonPol/info',
    handler: function(request, reply) {
        console.log('Server processing a /nonPol Info PUT request');
        pool.query('UPDATE `nonPolitician` SET `email` = ?, `picture` = ?, `firstName` = ?, `lastName` = ?, `phone` = ? WHERE `userId` = ?',
        [request.payload['email'],request.payload['picture'],request.payload['firstName'],request.payload['lastName'],request.payload['phone'], request.payload['userId']], function (error, results, fields) {
            if (error)
                throw error;
            reply (results);
        });       
    }
});
server.route({
    method: 'PUT',
    path: '/pol/info',
    handler: function(request, reply) {
        console.log('Server processing a /pol info PUT request');
        pool.query('UPDATE `politicians` SET `email` = ?, `picture` = ?, `firstName` = ?, `lastName` = ?, `phone` = ?, `partyId` = ?, `website` = ?, `platformId` = ? WHERE `polId` = ?',
        [request.payload['email'],request.payload['picture'],request.payload['firstName'],request.payload['lastName'],request.payload['phone'],request.payload['partyId'],
        request.payload['website'],request.payload['platformId'],request.payload['polId']], function (error, results, fields) {
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
        pool.query('SELECT positionId, dateTime, city,state FROM `elections`', function (error, results, fields) {
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
        pool.query('SELECT firstName,lastName, email, picture, partyId, phone, website, dateTime, city,state FROM `politicians` NATURAL JOIN `candidates` NATURAL JOIN `elections` WHERE `electionId`=? AND (`firstName`=? OR `lastName`=?)', [request.params.election,request.params.name,request.params.name], function (error, results, fields) {
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
        pool.query('SELECT firstName,lastName, positionId, dateTime, city,state FROM `politicians` NATURAL JOIN `candidates` NATURAL JOIN `elections` WHERE (`firstName`=? OR `lastName`=?)', [request.params.name,request.params.name], function (error, results, fields) {
            if (error)
                throw error;
            if(results.length>=1)
                reply (results);
            else
                reply("The people you are looking for doesn't enroll any election. ");

        });
        
    }
});

/*server.route({
    method: 'POST',
    path: '/login',
    handler: function (request, reply) {
        console.log('Server processing a /login request');

        pool.query('SELECT * FROM `politicians` WHERE `username` =? AND `password` = ? ', [request.payload['username'],request.payload['password']],function (error, results, fields) {
            if (error)
                throw error;
            
            pool.query(' SELECT * FROM `nonPolitician` WHERE `username` =? AND `password` = ?', [request.payload['username'],request.payload['password']],function (error, results2, fields) {
                if (error)
                    throw error;
                else{
                    if(results.length==1){
                        reply(results[0]);
                    }
                    else if(results2.length==1){
                        // if(results2[0].favorites != 'null'){
                        //     pool.query('SELECT firstName,lastName, positionId, dateTime, city,state FROM `politicians` NATURAL JOIN `candidates` NATURAL JOIN `elections` WHERE polId=?', [results2[0].favorite], function (error, results3, fields) {
                        //         if (error)
                        //             throw error;
                        //             if(results3.length>=1){
                        //                 reply('Hello '+results2[0].firstName+' '+results2[0].lastName+ ". Your favorite politician has upcoming election, please check it on election page.");
                        //             }
                        //             else
                        //                 reply('Hello '+results2[0].firstName+' '+results2[0].lastName+" your favorite is not in an election");
                
                        //     });
                        // }else{
                        //     reply('Hello '+results2[0].firstName+' '+results2[0].lastName);
                        // }
                        reply(results2[0]);
                    }
                    else reply('Cannot find account, try it again.');
                }
            });
        });
    }
});*/

server.route({
    method: ['POST','GET'],
    path: '/login',
    handler: function (request, reply) {
        
        let cookie =request.state.session;
        console.log('Server processing a /login request');
        if(cookie){
            cookie.lastVisit=Date.now();
            return reply.redirect('/login/profile').state('session',cookie);
        }
        pool.query('SELECT * FROM `politicians` WHERE `username` =? AND `password` = ? ', [request.payload['username'],request.payload['password']],function (error, results, fields) {
            if (error)
                throw error;
            
            pool.query(' SELECT * FROM `nonPolitician` WHERE `username` =? AND `password` = ?', [request.payload['username'],request.payload['password']],function (error, results2, fields) {
            if (error)
                throw error;
            else{
		if(results.length==1){
                    var users=request.payload['username'];
                    var passs=request.payload['password'];
                    if(!cookie){
                        cookie={
                            username: users,
                            password: passs
                        };
                    }
                    
                    cookie.lastVisit=Date.now();
                    return reply.redirect('/login/profile').state('session',cookie);
		}
                else if(results2.length==1){
                    var users=request.payload['username'];
                    var passs=request.payload['password'];
                    if(!cookie){
                        cookie={
                            username: users,
                            password: passs
                        };
                    }
                    cookie.lastVisit=Date.now();
                    return reply.redirect('/login/profile').state('session',cookie);
                    
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
        pool.query('SELECT firstName, lastName FROM `politicians` WHERE `username` =? AND `password` = ? ', [userr,pass],function (error, results, fields) {
            if (error)
                throw error;
            
            pool.query(' SELECT firstName,lastName FROM `nonPolitician` WHERE `username` =? AND `password` = ?', [userr,pass],function (error, results2, fields) {
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
        }
        
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
        pool.query('SELECT username, email, picture, firstName, lastName, partyId, phone, website, platformId FROM `politicians` WHERE `username` =? AND `password` = ? ', [userr,pass],function (error, results, fields) {
            if (error)
                throw error;
            
            pool.query(' SELECT username,email,picture,firstName,lastName,phone FROM `nonPolitician` WHERE `username` =? AND `password` = ?', [userr,pass],function (error, results2, fields) {
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
