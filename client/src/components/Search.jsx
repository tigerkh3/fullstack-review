import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    // need a binding so that this.setState is not undefined and shows up
    this.onChange = this.onChange.bind(this);
    //
    this.search = this.search.bind(this);
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search(props) {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.terms} onChange={this.onChange}/>
      <button onClick={this.search}> Add Repos </button>
    </div>)
  }
}

export default Search;