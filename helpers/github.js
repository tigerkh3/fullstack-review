const axios = require('axios');
const config = require('../config.js');


let getReposByUsername = (user) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  console.log('user', user);
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + user + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  // use axios to make a get request to github api at that url
  return axios.get(options.url, options.headers)
  .then ((response) => {
    console.log('our github response')
    return response;
  })

}

module.exports.getReposByUsername = getReposByUsername;