import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }


  search (term) {
    console.log(`${term} was searched`);
    // TODO

    // we make a POST request to /repos
    var data = {}
    data.username = term;
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    fetch('/repos', requestOptions)
      .then(() => {
         // make a request to update our repos list with new ones
         var request = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json'},
        }
        fetch('/repos', request)
          .then ( (response) => {
            response.json()
            . then ( (result) => {
              this.setState({repos: result.data})
            })
          })
      })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>

      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));