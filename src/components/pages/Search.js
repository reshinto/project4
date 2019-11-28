import React from 'react';
import Select from 'react-select';
import Results from '../Search/results.js'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default class Search extends React.Component {
  state = {
    allItems:{},
    selectedOption: null,
    populateItems: null
  };
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
      //pass selected option as props to results component
      <Results allData = {this.state.allItems} category = {this.state.selectedOption}/>
    );
  }
}