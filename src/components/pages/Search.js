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

import { Link } from "react-router-dom";

import { connect } from 'react-redux';

import {
  grayColor,
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "../../assets/jss/material-kit-react.js";

const options = [
  { value: 'frozen', label: 'Frozen' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'vegetables', label: 'Vegetables' },
  {value: 'snacks and candy', label: 'Snacks and Candy' },
  { value: 'baking needs', label: 'Baking Needs' },
];

const stores = [{value: "NTUC", label:"NTUC"}, {value: "Cold Storage", label: "Cold Storage"}, {value: "Giant", label: "Giant"}]

const locations = [{value: "Tanjong Pagar", label:"Tanjong Pagar"}, {value: "Lavender", label: "Lavender"}, {value: "Tampines", label: "Tampines"}]

const allItems =
                {
                    "frozen": {
                        "aisle":1,
                        "items":[
                            {name:"fish",
                            img: "../search-components/apples.png"
                            },
                            {name:"dumplings",
                            img: "../search-components/apples.png"
                            },
                            {name:"pizza",
                            img: "../search-components/apples.png"
                            },
                            {name:"prata",
                            img: "../search-components/prata.png"
                            },
                            {name:"ice cream",
                            img: "../search-components/watermelon.png"
                            }]
                    },

                     "fruits": {
                        "aisle": 2,
                        "items":[
                            {name:"apples",
                            img: "https://i1.wp.com/4f7bg01yl3z03jojs41hgo8k-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/HF160920_Global_Blog_All_About_Apples_15_low.jpg?ssl=1"
                            },
                            {name:"pears",
                            img: "https://placekitten.com/400/300"
                            },
                            {name:"blueberries",
                            img: "https://placekitten.com/400/300"
                            },
                            {name:"strawberries",
                            img: "https://placekitten.com/400/300"
                            },
                            {name:"watermelons",
                            img: "../search-components/watermelon.png"
                            }
                       ]
                    },

                    "vegetables": {
                        "aisle": 3,
                        "items":[
                            {name:"cucumbers",
                            img: "../search-components/apples.png"
                            },
                            {name:"carrots",
                            img: "../search-components/apples.png"
                            },
                            {name:"onions",
                            img: "../search-components/apples.png"
                            },
                            {name:"capsicum",
                            img: "../search-components/strawberries.png"
                            },
                            {name:"celery",
                            img: "../search-components/watermelon.png"
                            }]
                    },
                    "snacks and candy":{
                        "aisle":4,
                        "items":[
                            {name:"chocolate bars",
                            img: "../search-components/apples.png"
                            },
                            {name:"potato chips",
                            img: "../search-components/apples.png"
                            },
                            {name:"nuts",
                            img: "../search-components/apples.png"
                            },
                            {name:"gummies",
                            img: "../search-components/strawberries.png"
                            },
                            {name:"seaweed",
                            img: "../search-components/watermelon.png"
                            }]
                    },
                    "baking needs": {
                        "aisle":5,
                        "items": [
                            {name:"flour",
                            img: "../search-components/apples.png"
                            },
                            {name:"baking chocolate",
                            img: "../search-components/apples.png"
                            },
                            {name:"icing",
                            img: "../search-components/apples.png"
                            },
                            {name:"baking soda",
                            img: "../search-components/strawberries.png"
                            },
                            {name:"pancake mix",
                            img: "../search-components/watermelon.png"
                            }]
                    }

                }



    let itemsArray=[]
        for (const key in allItems){

            itemsArray.push(allItems[key].items)

         }
    let singleArrayItems = itemsArray.flat()

    let itemsObject = singleArrayItems.map(item=>{
        const container = {}
        container.value = item.name
        container.label = item.name.charAt(0).toUpperCase() + item.name.slice(1)
        return container
    })


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Search extends React.Component {

    constructor(){
        super()
          this.state = {
            selectedCategoryOption: null,
            selectedItemOption:null,
            selectedLayoutOption:null,
            selectedLocationOption:null,
            groceryList: [],
            open:false
          };

        this.addToList = this.addToList.bind(this)
        this.removeFromList = this.removeFromList.bind(this)
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

      handleLayoutChange = selectedLayoutOption => {
    this.setState(
      { selectedLayoutOption },
      () => console.log(`Option selected:`, this.state.selectedLayoutOption)
    );
  };

      handleLocationChange = selectedLocationOption => {
    this.setState(
      { selectedLocationOption },
      () => console.log(`Option selected:`, this.state.selectedLocationOption)
    );
  };

  addToList = (event)=>{
    let list = [...this.state.groceryList]

    list.push(event.target.value)

    let unique = [...new Set(list)]
    this.setState({groceryList:unique})
  }

  removeFromList = (event)=>{
    let list = [...this.state.groceryList]

    list.splice(event.target.value,1)

    let unique = [...new Set(list)]
    this.setState({groceryList:unique})
  }

  render() {
    const { selectedCategoryOption } = this.state;
    const { selectedItemOption } = this.state;
    const { selectedLayoutOption } = this.state;
    const { selectedLocationOption } = this.state;
    console.log('HELLO ARRAYYYY')
    console.log(singleArrayItems)

    return (
        <div style = {{padding:"5%", backgroundImage: `url(${SearchBackground})`, backgroundSize: "cover", filter: 'blur (5px)', minHeight: 800}}>
        <div style = {{padding:"5%", backgroundColor:"rgba(255,255,255,0.7)"}} >


                <h3 style = {{color:"rgb(156, 39, 176)"}}>Search by Item</h3>
              <Select
                value={selectedItemOption}
                onChange={this.handleItemChange}
                 isMulti
                options={itemsObject}
                className="basic-multi-select"
                classNamePrefix="select"
              />

        <ResultsItem allData = {singleArrayItems} itemFilter = {this.state.selectedItemOption} list = {this.addToList}/>


                <h3 style = {{color:"rgb(156, 39, 176)"}}>Search by Category</h3>
                  <Select
                value={selectedCategoryOption}
                onChange={this.handleCategoryChange}
                options={options}
              />

      <ResultsCategory allData = {allItems}  category = {this.state.selectedCategoryOption}  list = {this.addToList}/>
      <Grid container
      style = {{borderTop:"1px solid black"}}>

          <Grid item xs={6}>
            <h3 style = {{color:"rgb(156, 39, 176)"}}>Select Store</h3>
                <Select
                    value={selectedLayoutOption}
                    onChange={this.handleLayoutChange}
                    options={stores}
                />
            </Grid>

            <Grid item xs={6}>
            <h3 style = {{color:"rgb(156, 39, 176)"}}>Select Location</h3>
                <Select
                    value={selectedLocationOption}
                    onChange={this.handleLocationChange}
                    options={locations}
                />

            </Grid>
        </Grid>
        <br/>
        <Grid container
        justify="center">
            <Badge color="primary" badgeContent={this.state.groceryList.length} style = {{zIndex:"0"}}>
                   <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                      View Grocery List
                    </Button>
            </Badge>
        </Grid>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title" style = {{textAlign:"center",marginTop:"5%", padding:"0"}}>
            {"Your Grocery List"}
          </DialogTitle>
          {this.props.authenticated ? (
            <Button color = "secondary" >Save List</Button>
          ) : ""}
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                  <GroceryList list = {this.state.groceryList} remove = {this.removeFromList}/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button
              onClick={this.handleClose}
              color="primary"
              component={Link}
              to={"/shoptimize/floormap"}
            >
              Generate Map
            </Button>
          </DialogActions>
        </Dialog>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authReducer.authenticated,
  };
};

export default connect(
  mapStateToProps,
  null
)(Search);
