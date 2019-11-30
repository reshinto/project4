import React from 'react';
import Select from 'react-select';
import Results from '../search-components/results.js'
import SearchBar from '../search-components/searchbar.js'
import Fuse from 'fuse.js';

const options = [
  { value: 'frozen', label: 'Frozen' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'vegetables', label: 'Vegetables' },
  {value: 'snacks and candy', label: 'Snacks and Candy' },
  { value: 'baking needs', label: 'Baking Needs' },
];

const allItems =
                {
                    "frozen": {
                        "aisle":1,
                        "items":["fish","dumplings", "pizza","prata","ice cream"]
                    },

                     "fruits": {
                        "aisle": 2,
                        "items":["apples", "pears","blueberries","strawberries","watermelon"]
                    },

                    "vegetables": {
                        "aisle": 3,
                        "items":["cucumbers","carrots", "onions", "capsicum","celery"]
                    },
                    "snacks and candy":{
                        "aisle":4,
                        "items":["chocolate bars","potato chips","nuts", "gummies", "seaweed"]
                    },
                    "baking needs": {
                        "aisle":5,
                        "items": ["flour", "baking chocolate", "icing", "baking soda", "pancake mix"]
                    }

                }

    let itemsArray=[]
        for (const key in allItems){

            itemsArray.push(allItems[key].items)

         }
    let singleArrayItems = itemsArray.flat()

    let itemsObject = singleArrayItems.map(item=>{
        const container = {}
        container.value = item
        container.label = item.charAt(0).toUpperCase() + item.slice(1)
        return container
    })




export default class Search extends React.Component {

    constructor(){
        super()
          this.state = {
            selectedCategoryOption: null,
            selectedItemOption:null,
            filterCategory: [],
            filterInput:[]
          };
          // this.searchProduct = this.searchProduct.bind(this)
    }

    // searchProduct(event){
    //     let searchInput = event.target.value
    //     console.log(searchInput)
    //     let filteredProducts = []
    //     let itemsArray = []

    //      // const filteredProducts = allItems.filter((product)=>{return product.items !==-1})
    //      for (const key in allItems){

    //         itemsArray.push(allItems[key].items)

    //      }
    //      let singleArrayItems = itemsArray.flat()
    //      for (let i=0;i<singleArrayItems.length;i++){
    //          if (searchInput === singleArrayItems[i]){
    //             filteredProducts.push(singleArrayItems[i])
    //          }
    //      }
    //      console.log(filteredProducts)
    //     this.setState({populateItems:filteredProducts})
    // }

  handleCategoryChange = selectedCategoryOption => {
    this.setState(
      { selectedCategoryOption },
      () => console.log(`Option selected:`, this.state.selectedCategoryOption)
    );
  };

    handleItemChange = selectedItemOption => {
    this.setState(
      { selectedItemOption },
      () => console.log(`Option selected:`, this.state.selectedItemOption)
    );
  };

  render() {
    const { selectedCategoryOption } = this.state;
    const { selectedItemOption } = this.state;

    return (
        <div>
        <h3>Search by Item</h3>
      <Select
        value={selectedItemOption}
        onChange={this.handleItemChange}

         isMulti
        options={itemsObject}
        className="basic-multi-select"
        classNamePrefix="select"
      />
        <h3>Search by Category</h3>
          <Select
        value={selectedCategoryOption}
        onChange={this.handleCategoryChange}
        options={options}
      />

      <SearchBar onChange = {this.searchProduct}/>

      <Results allData = {allItems}  category = {this.state.selectedOption} filter = {this.state.populateItems}/>
      </div>
    );
  }
}