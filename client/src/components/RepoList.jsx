import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <h5> Our Top 25 Most Popular Repos</h5>
    {props.repos.map( (currRepo) => {
      return <li> {currRepo.repoName + ': ' + currRepo.repoCount}</li>
    })}
  </div>
)

export default RepoList;