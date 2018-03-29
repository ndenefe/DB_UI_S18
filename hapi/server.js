'use strict';
const Hapi = require('hapi');

const server = new Hapi.Server();


const connection = MySQL.createConnection({
	host:'0.0.0.0:3306',
	user:'root',
	password:'password',
	database:'DB_Lab'
});

server.connection({ port: 8000, host: '0.0.0.0' });

connection.connect();

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('Server processing a / request');
        reply('Hello, world!');
    }
});

server.route({
	method:'GET',
	path:'/users',
	handler:function(reuest,reply){
		connection.query('SELECT username,email FROM politicians',
		function(error,results,fields) {
			if(error) throw error;
			reply(results);
		});
	}
});
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at: ${server.info.uri}');
});