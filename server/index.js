const express = require('express');
const getRepos = require('../helpers/github.js');
const Promise = require('bluebird');
const saveRepo = require('../database/index.js')
let app = express();
var bodyParser = require('body-parser');

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
  getRepos.getReposByUsername(username)
    .then ( (userData) =>{
      var userRepos = userData.data;
      // result.data gives us our array of repo data
      // result.data[index].name, gives us the specific name of repo we want
      var owner = userRepos[0].owner.login;
      // result.data[index].id gives us the repo ID, could be useful
      var repos = [];
            // iterate through the userRepos array
      for (var i = 0; i < userRepos.length; i++) {
        var currRepo = userRepos[i];
        var repoData = {}
        var name = currRepo.name;
        var id = currRepo.id
        repoData[name] = id;
        repos.push(repoData);
      }
      saveRepo.save(owner, repos)
        .then ((result) => {
          console.log(result);
          res.send('request complete!')
          console.log('success!')
        })
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  res.send("Working");
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

