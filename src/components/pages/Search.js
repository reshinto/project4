import React from 'react';
import Select from 'react-select';
import Results from '../Search/results.js'
import SearchBar from '../Search/searchbar.js'
import Fuse from 'fuse.js';

const options = [
  { value: 'frozen', label: 'Frozen' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'vegetables', label: 'Vegetables' },
];

// var searchOptions = {
//   shouldSort: true,
//   threshold: 0.6,
//   location: 0,
//   distance: 100,
//   maxPatternLength: 32,
//   minMatchCharLength: 1,
//   keys: [
//     "title",
//     "author.firstName"
//   ]
// };

// var fuse = new Fuse(list, options); // "list" is the item array
// var result = fuse.search("");

const allItems = [
                    {
                        "frozen": {
                        "aisle":1,
                        "items":["fish","dumplings"]
                        }
                     },
                     {
                         "fruits": {
                            "aisle": 2,
                            "items":["apple", "pear","blueberry"]
                        }
                     },
                     {
                        "vegetables": {
                            "aisle": 3,
                            "items":["cucumber","carrot"]
                        }
                    }
                ]



export default class Search extends React.Component {

    constructor(){
        super()
          this.state = {
            selectedOption: null,
            populateItems: []
          };
          this.searchProduct = this.searchProduct.bind(this)
    }

    searchProduct(event){
        let searchInput = event.target.value
        console.log(searchInput)
        let filteredProducts = []

         // const filteredProducts = allItems.filter((product)=>{return product.items !==-1})



         for (let i=0;i<allItems.length;i++){
           for (const property in allItems[i]){
                 for (let j=0;j<allItems[i][property]["items"].length; j++){
                if (allItems[i][property]["items"][j] === searchInput){
                   filteredProducts.push(allItems[i][property]["items"][j])
                }
            }

           }


         }

        this.setState({populateItems:filteredProducts})
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

      <SearchBar onChange = {this.searchProduct}/>

      <Results allData = {allItems}  category = {this.state.selectedOption} filter = {this.state.populateItems}/>
      </div>
    );
  }
}