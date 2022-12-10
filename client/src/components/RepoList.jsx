import React from 'react';


const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <h5> Our Top 25 Most Popular Repos</h5>
    <table>
      <tr>
      <th> Repo Name </th>
      <th> Repo Count</th>
      <th> Repo Link </th>
      </tr>
    {props.repos.map( (currRepo, index) => {
      return <tr>
        <th><a href={currRepo.repoLink}>{currRepo.repoName}</a></th>
        <th>{currRepo.repoCount}</th>
    </tr>
    })}
    </table>
  </div>
)

export default RepoList;