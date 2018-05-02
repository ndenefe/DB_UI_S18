'use strict';

const Hapi = require('hapi');
const Handler=require('./handlers');
const handlers=new Handler();
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

var {pool} = require('./sql-pool.js');


server.state('session',{
    ttl:60*1000*24*24,   // session time 1 day
    isSecure:false,
    encoding:'base64json',
    clearInvalid: true,
    strictHeader: false,

});


//FULL TABLE GET ROUTES
server.route({
    method: 'GET',
    path: '/getFavorites',
    handler: handlers.getFavorites
});

server.route({
    method: 'GET',
    path: '/getPhone',
    handler: handlers.getPhone
});

server.route({
    method: 'GET',
    path: '/getPlatform',
    handler: handlers.getPlatform
});

server.route({
    method: 'GET',
    path: '/getPictures',
    handler: handlers.getPictures
});

server.route({
    method: 'GET',
    path: '/getParty',
    handler: handlers.getParty
});

server.route({
    method: 'GET',
    path: '/getElections',
    handler: handlers.getElections
});

server.route({
    method: 'GET',
    path: '/getCandidates',
    handler: handlers.getCandidates
});

server.route({
    method: 'GET',
    path: '/getPositions',
    handler: handlers.getPositions
});

server.route({
    method: 'GET',
    path: '/getUnique',
    handler: handlers.getUnique
});

server.route({
    method: 'GET',
    path: '/search/{name}',
    handler: handlers.searchByName
});


//A new route to test connectivity to MySQL
server.route({
    method: 'GET',
    path: '/getNonPol',
    handler: handlers.getNonPol
});
server.route({
    method: 'GET',
    path: '/getPol',
    handler: handlers.getPol
});

server.route({
    method: 'POST',
    path: '/nonPol',
    handler: handlers.postNonPol
});

server.route({
    method: 'POST',
    path: '/pol',
    handler: handlers.postPol
});

server.route({
    method: 'PUT',
    path: '/nonPol/creds',
    handler: handlers.updateNonPolCreds
});
server.route({
    method: 'PUT',
    path: '/pol/creds',
    handler: handlers.updatePolCreds
});
server.route({
    method: 'PUT',
    path: '/nonPol/info',
    handler: handlers.updateNonPolInfo
});
server.route({
    method: 'PUT',
    path: '/pol/info',
    handler: handlers.updatePolInfo
});

server.route({
    method: 'DELETE',
    path: `/deleteAccount/{UID}`,
    handler: handlers.deleteAcc
});
server.route({
    method: 'GET',
    path: '/election',
    handler: handlers.election
});

server.route({
    method: 'GET',
    path: '/election/{name}',
    handler: handlers.electionByCandidateName
});

server.route({
    method: 'POST',
    path: '/login',
    handler: handlers.login
});

server.route({ //Gets all information pertaining to a UID
    method: 'GET',
    path: '/account/{UID}',
    handler: handlers.accountByUniqueId
});

server.route({ //Gets an election by its zip code
    method: 'GET',
    path: '/election_location/{zip}',
    handler: handlers.electionLocation
});

server.route({ //Gets candidates by electionId code
    method: 'GET',
    path: '/candidates/{electionId}',
    handler: handlers.candidatesByElectionId
});
server.route({ //Gets candidates by electionId code
    method: 'GET',
    path: '/pol/{zip}',
    handler: handlers.polLoc
});
server.route({ //Gets candidates by electionId code
    method: 'POST',
    path: '/polLoc',
    handler: handlers.postPolLoc
});

/*server.route({
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
});*/

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
