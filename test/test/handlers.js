var {pool}=require('./sql-pool');
class handlers {
    constructor(){

    }
    getFavorites(request, reply) {
        console.log('Server processing a /getFavorites request');
        pool.query('SELECT * FROM `favorites`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
    getPhone (request, reply) {
        console.log('Server processing a /getPhone request');
        pool.query('SELECT * FROM `phone`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
    getPlatform (request, reply) {
        console.log('Server processing a /getPlatform request');
        pool.query('SELECT * FROM `platform`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
    getPictures (request, reply) {
        console.log('Server processing a /getPictures request');
        pool.query('SELECT * FROM `pictures`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
    getParty (request, reply) {
        console.log('Server processing a /getParty request');
        pool.query('SELECT * FROM `party`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
    getElections (request, reply) {
        console.log('Server processing a /getElections request');
        pool.query('SELECT `firstName`, `lastName`, `name` AS `position`, `dateTime`, `city`, `state` FROM `elections` NATURAL JOIN `positions` NATURAL JOIN `candidates` NATURAL JOIN `politicians`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
    getCandidates (request, reply) {
        console.log('Server processing a /getCandidates request');
        pool.query('SELECT * FROM `candidates`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
    getPositions (request, reply) {
        console.log('Server processing a /getPositions request');
        pool.query('SELECT * FROM `positions`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
    getUnique (request, reply) {
        console.log('Server processing a /getUnique request');
        pool.query('SELECT * FROM `uniqueIds`', function (error, results, fields){
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply (results);
        });
    }
    searchByName (request, reply) {
        console.log('Server processing a /search request');
        console.log(request.params.name);
        pool.query('SELECT * FROM `nonPolitician` WHERE `firstName`=? OR `lastName`=?', [request.params.name,request.params.name], function (error, results, fields) {
            if (error)
                throw error;
            else{
                pool.query('SELECT * FROM `politicians` WHERE `firstName`=? OR `lastName`=?', [request.params.name,request.params.name], function (error, results2, fields) {
                    if (error)
                        throw error;
                    else{
                        reply([results,results2]);
                    }

                });
            }
        });
    }
    getNonPol (request, reply) {
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
    getPol (request, reply) {
        
        console.log('Server processing a /pol request');
        pool.query('SELECT * FROM politicians', function (error, results, fields) {
            if (error)
                throw error;
            reply (results);

        });
        
    } 
    postNonPol(request, reply) {
        console.log('Server processing a /nonPol POST request');
        pool.query('INSERT INTO `nonPolitician` (`username`,`password`,`email`,`picture`,`firstName`,`lastName`,`phone`) VALUES(?, ?, ?, ?, ?, ?, ?)',
        [request.payload['username'],request.payload['password'],request.payload['email'],request.payload['picture'],request.payload['firstName'],
        request.payload['lastName'], request.payload['phone']],function (error, results, fields){
            if (error)
                throw error;
            reply (results);
        });
    }
    postPol(request, reply) {
        console.log('Server processing a /pol POST request');
        pool.query('INSERT INTO `politicians` (`username`,`password`,`email`,`picture`,`firstName`,`lastName`,`phone`,`partyId`,`website`,`platformId`,`tenure`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [request.payload['username'],request.payload['password'],request.payload['email'],request.payload['picture'],request.payload['firstName'],
        request.payload['lastName'], request.payload['phone'],request.payload['partyId'],request.payload['website'],request.payload['platformId'],request.payload['tenure']],
        function (error, results, fields){
            if (error)
                throw error;
            else reply(results);
        });
    }
    updateNonPolCreds(request, reply) {
        console.log('Server processing a /nonPol credential PUT request');
        pool.query('UPDATE `nonPolitician` SET `username` = ?, `password` = ? WHERE `userId` = ?',
        [request.payload['username'],request.payload['password'],request.payload['userId']], function (error, results, fields) {
            if (error)
                throw error;
            reply (results);
        });        
    }
    updatePolCreds(request, reply) {
        console.log('Server processing a /pol credential PUT request');
        pool.query('UPDATE `politicians` SET `username` = ?, `password` = ? WHERE `polId` = ?',
        [request.payload['username'],request.payload['password'],request.payload['polId']], function (error, results, fields) {
            if (error)
                throw error;
            reply (results);
        });        
    }
    updateNonPolInfo(request, reply) {
        console.log('Server processing a /nonPol Info PUT request');
        pool.query('UPDATE `nonPolitician` SET `email` = ?, `picture` = ?, `firstName` = ?, `lastName` = ?, `phone` = ? WHERE `userId` = ?',
        [request.payload['email'],request.payload['picture'],request.payload['firstName'],request.payload['lastName'],request.payload['phone'], request.payload['userId']], function (error, results, fields) {
            if (error)
                throw error;
            reply (results);
        });       
    }
    updatePolInfo(request, reply) {
        console.log('Server processing a /pol info PUT request');
        pool.query('UPDATE `politicians` SET `email` = ?, `picture` = ?, `firstName` = ?, `lastName` = ?, `phone` = ?, `partyId` = ?, `website` = ?, `platformId` = ?, `tenure` = ? WHERE `polId` = ?',
        [request.payload['email'],request.payload['picture'],request.payload['firstName'],request.payload['lastName'],request.payload['phone'],request.payload['partyId'],
        request.payload['website'],request.payload['platformId'], request.payload['tenure'],request.payload['polId']], function (error, results, fields) {
            if (error)
                throw error;
            reply (results);
        });        
    }
    deleteAcc(request, reply) {
        console.log('Server processing a /deleteAccount request');
        pool.query('DELETE FROM uniqueIds WHERE uniqueId = ?', request.params['UID'], function(error,results,fields){
            if(error)
                throw error;
            reply(results);
        });
    }
    election (request, reply) {
        
        console.log('Server processing a /election request');
        pool.query('SELECT name AS position, dateTime, city,state FROM `elections` NATURAL JOIN `positions`', function (error, results, fields) {
            if (error)
                throw error;
            reply (results);

        });
        
    }
    electionByCandidateName (request, reply) {
        
        console.log('Server processing a /searchElection request');
        pool.query('SELECT firstName, lastName, electionId, name AS position, dateTime, city, state FROM `politicians` NATURAL JOIN `candidates` NATURAL JOIN `elections` NATURAL JOIN `positions` WHERE (`firstName`=? OR `lastName`=?)', [request.params.name,request.params.name], function (error, results, fields) {
            if (error)
                throw error;
            if(results.length>=1)
                reply (results);
            else
                reply("The people you are looking for doesn't enroll any election. ");

        });
        
    }
    login (request, reply) {
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
    accountByUniqueId (request, reply) {
        
        console.log('Server processing a /account request');
        pool.query('SELECT isPol, UID FROM `uniqueIds` WHERE `uniqueId` = ?', request.params['UID'], function (error, results, fields) {
            if (error)
                throw error;
            if (results[0].isPol===1){
                //console.log(`political`);
                pool.query('SELECT * FROM (`politicians` NATURAL JOIN `party`) WHERE `polId` = ?',results[0].UID, function(error, results2, fields){
                    reply(results2);
                });
            }else if (results[0].isPol===0){
                //console.log('nonpolitical');
                pool.query('SELECT * FROM nonPolitician WHERE userId = ?',results[0].UID, function(error, results3, fields){
                    reply(results3);
                });
            }
            //reply(results);

        });
        
        
    }
    electionLocation (request, reply) {
        
        console.log('Server processing a /election request');
        pool.query('SELECT electionId, name AS position, dateTime, city, state, zip FROM `elections` NATURAL JOIN `positions` WHERE `zip` = ?', request.params['zip'], function (error, results, fields) {
            if (error)
                throw error;
                
        reply(results);
        });
        
        
    }
    candidatesByElectionId (request, reply) {
        
        console.log('Server processing a /candidates request');
        pool.query('SELECT * FROM `politicians` NATURAL JOIN `candidates` WHERE `electionId` = ?', request.params['electionId'], function (error, results, fields) {
            if (error)
                throw error;
        reply(results);

        });
        
        
    }

}
module.exports=handlers