const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  username: String,
  repos: []
});

let Repo = mongoose.model('Repo', repoSchema);

// storage to determine uniqueness
var storage = {};

let save = (username, repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var uniqueRepos = [];

  // iterate through the repos
  for (var i = 0; i < repos.length; i++) {
    // repo object ie. { shortly-express: '*id number*'}
    var currRepo = repos[i];
    // name of the repo ie. shortly-express
    var key = Object.keys(repos[i])[0];
    if (storage.key === undefined) {
      uniqueRepos.push(key)
      storage.key = 1;
    } else if (storage.key) {
      storage.key += 1;
    }
  }
  // repos will be an array of strings
  // create a new schema with arguments
  var userData = new Repo({
    username: username,
    id: id,
    repos: uniqueRepos
  })
  return userData.save()
    .then ((result) => {
      return result;
    })
}

module.exports.save = save;