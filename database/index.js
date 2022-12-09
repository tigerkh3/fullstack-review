const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoName: String,
  repoCount: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  var addRepo = new Repo({
    repoName: repo,
    repoCount: '1'
  })
  return addRepo.save()
    .then ((result)=>{
     return 'Added repo to database';
    })
}

let top25 = () => {
  return Repo.find().sort({'repoCount': -1})
    .then ( (result) => {
      var topRepos = [];
      for (var i = 0; i < result.length; i++) {
        topRepos.push(result[i]);
        if (i === 24) {
          break;
        }
      }
      return topRepos;
    })
}

let uniqueCheck = (currRepo) => {
  return Repo.findOne({'repoName': currRepo})
    .then ((result) => {
      if (result === null) {
        return true;
      } else {
        return false;
      }
    })
}

let increaseCount = (currRepo) => {
  return Repo.updateOne({'repoName': currRepo}, {$inc: {'repoCount': '1'}})
    .then((result) => {
      return 'Repo already exists, popularity +1'
    })
}


module.exports.save = save;
module.exports.top25 = top25;
module.exports.uniqueCheck = uniqueCheck;
module.exports.increaseCount = increaseCount;