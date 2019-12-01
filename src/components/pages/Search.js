import React from 'react';
import Select from 'react-select';
import ResultsItem from '../search-components/resultsitem.js'
import ResultsCategory from '../search-components/resultscategory.js'
import SearchBar from '../search-components/searchbar.js'
import GroceryList from '../search-components/grocerylist.js'
import Grid from '@material-ui/core/Grid';
import Fuse from 'fuse.js';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {searchBackground} from '../search-components/search-style.js'
import SearchBackground from '../search-components/grocery.jpg'
import Badge from '@material-ui/core/Badge';

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


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class Search extends React.Component {

    constructor(){
        super()
          this.state = {
            selectedCategoryOption: null,
            selectedItemOption:null,
            groceryList: [],
            open:false
          };

        this.addToList = this.addToList.bind(this)
    }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


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

    let unique = [...new Set(list)]
    this.setState({groceryList:unique})
  }

  render() {
    const { selectedCategoryOption } = this.state;
    const { selectedItemOption } = this.state;
    console.log(this.state)

    return (
        <div style = {{padding:"5%", backgroundImage: `url(${SearchBackground})`, backgroundSize: "cover", filter: 'blur (5px)', height: 800}}>
        <div style = {{border:"1px solid black", padding:"5%", backgroundColor:"rgba(255,255,255,0.5)"}} >


                <h3>Search by Item</h3>
              <Select
                value={selectedItemOption}
                onChange={this.handleItemChange}
                 isMulti
                options={itemsObject}
                className="basic-multi-select"
                classNamePrefix="select"
              />

        <ResultsItem allData = {allItems} itemFilter = {this.state.selectedItemOption} list = {this.addToList}/>


                <h3>Search by Category</h3>
                  <Select
                value={selectedCategoryOption}
                onChange={this.handleCategoryChange}
                options={options}
              />




      <ResultsCategory allData = {allItems}  category = {this.state.selectedCategoryOption}  list = {this.addToList}/>

      <Badge color="primary" badgeContent={this.state.groceryList.length}>
       <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
          View Grocery List
        </Button>
        </Badge>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Your Grocery List"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                  <GroceryList list = {this.state.groceryList}/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Close
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              Generate Map
            </Button>
          </DialogActions>
        </Dialog>
        </div>
      </div>
    );
  }
}