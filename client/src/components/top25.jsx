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
}