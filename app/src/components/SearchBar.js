import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  defaultValidation(input) {
    if (!input || !input.trim().length) {
      return {
        valid: false,
        errors: [
          'Please enter a valid input'
        ]
      }
    };
    return { valid: true };
  }

  handleSearchButtonClick() {
    const input = this.state.input;
    const validator = this.props.inputValidator || this.defaultValidation;
    if (!validator(input).valid) {
      // handle errors
      return;
    }
    return this.props.onSearch(input);
  }


  render() {
    const { onSearch, searchBarPlaceHolder, inputValidator } = this.props;
    const { input } = this.state;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.handleSearchButtonClick();
        }}
      >
        <input
          placeholder={searchBarPlaceHolder}
          value={input}
          onChange={this.handleInputChange}
        />
        <button
          disabled={!input.trim().length}
          onClick={this.handleSearchButtonClick}
        >
          Search
        </button>

      </form>
    );
  }
}

export default SearchBar;