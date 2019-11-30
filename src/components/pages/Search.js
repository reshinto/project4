import React from 'react';
import Select from 'react-select';
import Results from '../search-components/results.js'
import SearchBar from '../search-components/searchbar.js'
import GroceryList from '../search-components/grocerylist.js'
import Grid from '@material-ui/core/Grid';
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
            groceryList: []
          };

        this.addToList = this.addToList.bind(this)
    }

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

  addToList = (event)=>{
    let list = [...this.state.groceryList]

    list.push(event.target.value)
    this.setState({groceryList:list})
  }

  render() {
    const { selectedCategoryOption } = this.state;
    const { selectedItemOption } = this.state;
    console.log(this.state)

    return (
        <div>
        <Grid container>
            <Grid item xs = {6}>
                <h3>Search by Item</h3>
              <Select
                value={selectedItemOption}
                onChange={this.handleItemChange}
                 isMulti
                options={itemsObject}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Grid>

               <Grid item xs = {6}>
                <h3>Search by Category</h3>
                  <Select
                value={selectedCategoryOption}
                onChange={this.handleCategoryChange}
                options={options}
              />
              </Grid>

        </Grid>

      <Results allData = {allItems}  category = {this.state.selectedCategoryOption} itemFilter = {this.state.selectedItemOption} list = {this.addToList}/>

      <GroceryList list = {this.state.groceryList}/>
      </div>
    );
  }
}