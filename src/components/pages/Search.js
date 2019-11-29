import React from 'react';
import Select from 'react-select';
import Results from '../Search/results.js'

const options = [
  { value: 'frozen', label: 'Frozen' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'vegetables', label: 'Vegetables' },
];

export default class Search extends React.Component {

    constructor(){
        super()
          this.state = {
            allItems:{
                "frozen": {
                    "aisle":1,
                    "items":["fish","dumplings"]
                },
                 "fruits": {
                    "aisle": 2,
                    "items":["apple", "pear","blueberry"]
                },
                "vegetables": {
                    "aisle": 3,
                    "items":["cucumber","carrot"]
                },
            },
            selectedOption: null,
            populateItems: ''
          };
    }

  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  render() {
    const { selectedOption } = this.state;
    console.log(this.state.selectedOption)

    return (
        <div>
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />

      <Results allData = {this.state.allItems}  category = {this.state.selectedOption}/>
      </div>
    );
  }
}