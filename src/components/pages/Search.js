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
// import Badge from 'components/Badge/Badge.js';

import { Link } from "react-router-dom";

import badgeStyle from "../../assets/jss/material-kit-react/components/badgeStyle.js"

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
                            img: "https://www.thespruceeats.com/thmb/yPLWl_gyHEd0479KtY8NxoMNspM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/148964914-56a2f6f35f9b58b7d0cfe462.jpg"
                            },
                            {name:"dumplings",
                            img: "https://static01.nyt.com/images/2014/07/29/magazine/Dumplings1/Dumplings1-tmagArticle.jpg"
                            },
                            {name:"pizza",
                            img: "http://www.marketreportgazette.com/wp-content/uploads/2019/08/Frozen-Pizza.jpg"
                            },
                            {name:"prata",
                            img: "https://d22ir9aoo7cbf6.cloudfront.net/wp-content/uploads/sites/2/2016/03/roti-prata-in-singapore.jpg"
                            },
                            {name:"ice cream",
                            img: "https://previews.123rf.com/images/foodandmore/foodandmore1404/foodandmore140400039/27128938-array-of-different-flavored-colorful-ice-cream-in-plastic-tubs-displayed-on-an-old-wooden-table-at-a.jpg"
                            }]
                    },

                     "fruits": {
                        "aisle": 2,
                        "items":[
                            {name:"apples",
                            img: "https://i1.wp.com/4f7bg01yl3z03jojs41hgo8k-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/HF160920_Global_Blog_All_About_Apples_15_low.jpg?ssl=1"
                            },
                            {name:"blueberries",
                            img: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/blueberries-1296x728-feature.jpg?w=1155&h=1528"
                            },
                            {name:"pears",
                            img: "https://www.stemilt.com/wp-content/uploads/2016/07/Concorde.jpg"
                            },
                            {name:"strawberries",
                            img: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Ffield%2Fimage%2Fstrawberry-calories-hero-getty.jpg%3Fitok%3DgMhqclgZ&w=450&c=sc&poi=face&q=85"
                            },
                            {name:"watermelons",
                            img: "https://media.fromthegrapevine.com/assets/images/2016/7/watermelon-whole-one-half.jpg.480x0_q71_crop-scale.jpg"
                            }
                       ]
                    },

                    "vegetables": {
                        "aisle": 3,
                        "items":[
                            {name:"cucumbers",
                            img: "https://cfig.ca/wp-content/uploads/2018/11/cucumber.jpg"
                            },
                            {name:"carrots",
                            img: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/18/09/2048x1364/gallery-1519672422-carrots.jpg?resize=480:*"
                            },
                            {name:"onions",
                            img: "https://www.thespruceeats.com/thmb/sxx0JHQRPnPV0heagzJFz__zarE=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/onions-2500-5839b12d5f9b58d5b1107a90.jpg"
                            },
                            {name:"capsicum",
                            img: "https://1v1d1e1lmiki1lgcvx32p49h8fe-wpengine.netdna-ssl.com/wp-content/uploads/2018/04/1522916196-coloured-capsicums-peppers-.jpg"
                            },
                            {name:"celery",
                            img: "https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_1500/https%3A%2F%2Fstorage.googleapis.com%2Fgen-atmedia%2F3%2F2014%2F10%2F1c340c24e50e2a71609db0d2c0d77849b36ba2b4.jpeg"
                            }]
                    },
                    "snacks and candy":{
                        "aisle":4,
                        "items":[
                            {name:"chocolate bars",
                            img: "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/confectionerynews.com/article/2019/08/19/new-study-finds-steep-rise-in-sugar-levels-in-uk-chocolate-bars/10055756-1-eng-GB/New-study-finds-steep-rise-in-sugar-levels-in-UK-chocolate-bars_wrbm_large.jpg"
                            },
                            {name:"potato chips",
                            img: "https://previews.123rf.com/images/kwangmoo/kwangmoo1807/kwangmoo180700317/104709437-crispy-potato-chips-snack-texture-background.jpg"
                            },
                            {name:"nuts",
                            img: "https://media.npr.org/assets/img/2019/09/27/nuts-1_custom-61cfca772f4f991e157977ffe42febcb8c23d7dc-s800-c85.jpg"
                            },
                            {name:"gummies",
                            img: "https://tidbitsmag.com/wp-content/uploads/2016/08/20685982-Assortment-of-gummies-on-a-market-stall-Stock-Photo.jpg"
                            },
                            {name:"seaweed",
                            img: "https://media.npr.org/assets/img/2017/08/31/istock-605786284-34f5b78a564c2a7c6e7bfe5d68a2b830a42e4238-s800-c85.jpg"
                            }]
                    },
                    "baking needs": {
                        "aisle":5,
                        "items": [
                            {name:"flour",
                            img: "https://img2.exportersindia.com/product_images/bc-full/2019/5/6121355/whole-wheat-flour-1559192789-4929971.jpeg"
                            },
                            {name:"baking chocolate",
                            img: "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/02/baking-with-chocolate-5.jpg"
                            },
                            {name:"icing",
                            img: "https://www.biggerbolderbaking.com/wp-content/uploads/2018/03/BBB214-Crazy-Frosting-Website-Featured-Image.jpg"
                            },
                            {name:"baking soda",
                            img: "https://www.thespruceeats.com/thmb/e8HKZPTx6Q6GxiCHcudw9QrAHC8=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/baking-soda-58ace6af5f9b58a3c9b23ab2.jpg"
                            },
                            {name:"pancake mix",
                            img: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/7/11/0/FNK_the-best-pancakes_H_s4x3.jpg.rend.hgtvcom.826.620.suffix/1562853903667.jpeg"
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

export default class Search extends React.Component {

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
      style = {{borderTop:"1px solid black", marginTop: 10}}>

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
            <Badge color = "primary"
            badgeContent={this.state.groceryList.length} style = {{zIndex:"0"}}>
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
          <Button color = "secondary" >Save List</Button>
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