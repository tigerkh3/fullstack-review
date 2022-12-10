const express = require('express');
const helpers = require('../helpers/github.js');
const Promise = require('bluebird');
const saveRepo = require('../database/index.js')
let app = express();
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
test = mongoose.connect('mongodb://localhost/fetcher');

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
app.use(express.static("client/dist"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // req.body.username gives us our desired username
  var username = req.body.username;
  // make the call to our helper function that calls github API
  helpers.getReposByUsername(username)
    .then ( (userData) =>{
      var userRepos = userData.data;
      // iterate through all repos
      Promise.all(userRepos.map( (currRepo) => {
        return saveRepo.uniqueCheck(currRepo.name)
          .then( (result) => {
            return result;
          })
      }))
        .then ( (result) => {
          // iterate over the array of the results
          return Promise.all(result.map( (currResult, index) => {
            if (currResult) {
              return saveRepo.save(userRepos[index].name)
                .then ( (result) => {
                  return result;
                })
            } else {
              return saveRepo.increaseCount(userRepos[index].name)
                .then ( (result) => {
                  return result;
                })
            }
          }))
          .then ( (result) => {
            res.send('All user repos added to database!')
          })
        })
      })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  saveRepo.top25()
    .then ( (result) => {
      console.log('this data should be an array', Array.isArray(result));
      res.send({data: result});
    })
  // we want to make a call to our database
  // might be easier to import another function existing in our database

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

