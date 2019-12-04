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
import { setGroceryList, setMap } from "../../redux/actions/mapAction";
import { withStyles } from "@material-ui/core/styles";

import badgeStyle from "../../assets/jss/material-kit-react/components/badgeStyle.js"

import { connect } from 'react-redux';

const styles = theme=>({
    dropdownFont:{color: "black"}
})

const options = [
  { value: 'frozen', label: 'Frozen' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'vegetables', label: 'Vegetables' },
  {value: 'snacks and candy', label: 'Snacks and Candy' },
  { value: 'baking needs', label: 'Baking Needs' },
];

const stores = [
  {
    value: "NTUC",
    label:"NTUC",
    locations: [
      {
        value: "Tanjong Pagar",
        label:"Tanjong Pagar",
        mapType: {
          name: "map1",
          category: {
            "frozen": 7579,
            "fruits": 5239,
            "vegetables": 2115,
            "snacks and candy": 4409,
            "baking needs": 3665
          }
        }
      },
      {
        value: "Lavender",
        label: "Lavender",
        mapType: {
          name: "map2",
          category: {
            "frozen": 5420,
            "fruits": 6420,
            "vegetables": 6065,
            "snacks and candy": 7579,
            "baking needs": 2115
          }
        }
      },
      {
        value: "Terence's House",
        label: "Terence's House",
        mapType: {
          name: "map3",
          category: {
            "frozen": 8015,
            "fruits": 8469,
            "vegetables": 2465,
            "snacks and candy": 565,
            "baking needs": 3919
          }
        }
      }
    ]
  },
  {
    value: "Cold Storage",
    label: "Cold Storage",
    locations: [
      {
        value: "Tanjong Pagar",
        label:"Tanjong Pagar",
        mapType: {
          name: "map2",
          category: {
            "frozen": 5420,
            "fruits": 6420,
            "vegetables": 6065,
            "snacks and candy": 7579,
            "baking needs": 2115
          }
        }
      },
      {
        value: "Lavender",
        label: "Lavender",
        mapType: {
          name: "map1",
          category: {
            "frozen": 7579,
            "fruits": 5239,
            "vegetables": 2115,
            "snacks and candy": 4409,
            "baking needs": 3665
          }
        }
      },
      {
        value: "Tampines",
        label: "Tampines",
        mapType: {
          name: "map3",
          category: {
            "frozen": 8015,
            "fruits": 8469,
            "vegetables": 2465,
            "snacks and candy": 565,
            "baking needs": 3919
          }
        }
      }
    ]
  },
  {
    value: "Giant",
    label: "Giant",
    locations: [{
      value: "Garrick's",
      label:"Garrick's",
        mapType: {
          name: "map1",
          category: {
            "frozen": 7579,
            "fruits": 5239,
            "vegetables": 2115,
            "snacks and candy": 4409,
            "baking needs": 3665
          }
        }
    }]}
]


const allItems =
                {
                    "frozen": {
                        "aisle":1,
                        "items":[
                            {value:"fish",
                            img: "https://www.thespruceeats.com/thmb/yPLWl_gyHEd0479KtY8NxoMNspM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/148964914-56a2f6f35f9b58b7d0cfe462.jpg",
                            category:"frozen"
                            },
                            {value:"dumplings",
                            img: "https://static01.nyt.com/images/2014/07/29/magazine/Dumplings1/Dumplings1-tmagArticle.jpg",
                            category:"frozen"
                            },
                            {value:"pizza",
                            img: "http://www.marketreportgazette.com/wp-content/uploads/2019/08/Frozen-Pizza.jpg",
                            category:"frozen"
                            },
                            {value:"prata",
                            img: "https://d22ir9aoo7cbf6.cloudfront.net/wp-content/uploads/sites/2/2016/03/roti-prata-in-singapore.jpg",
                            category:"frozen"
                            },
                            {value:"ice cream",
                            img: "https://previews.123rf.com/images/foodandmore/foodandmore1404/foodandmore140400039/27128938-array-of-different-flavored-colorful-ice-cream-in-plastic-tubs-displayed-on-an-old-wooden-table-at-a.jpg",
                            category:"frozen"
                            }]
                    },

                     "fruits": {
                        "aisle": 2,
                        "items":[
                            {value:"apples",
                            img: "https://i1.wp.com/4f7bg01yl3z03jojs41hgo8k-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/HF160920_Global_Blog_All_About_Apples_15_low.jpg?ssl=1",
                            category:"fruits"
                            },
                            {value:"blueberries",
                            img: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/blueberries-1296x728-feature.jpg?w=1155&h=1528",
                            category:"fruits"
                            },
                            {value:"pears",
                            img: "https://www.stemilt.com/wp-content/uploads/2016/07/Concorde.jpg",
                            category:"fruits"
                            },
                            {value:"strawberries",
                            img: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Ffield%2Fimage%2Fstrawberry-calories-hero-getty.jpg%3Fitok%3DgMhqclgZ&w=450&c=sc&poi=face&q=85",
                            category:"fruits"
                            },
                            {value:"watermelons",
                            img: "https://media.fromthegrapevine.com/assets/images/2016/7/watermelon-whole-one-half.jpg.480x0_q71_crop-scale.jpg",
                            category:"fruits"
                            }
                       ]
                    },

                    "vegetables": {
                        "aisle": 3,
                        "items":[
                            {value:"cucumbers",
                            img: "https://cfig.ca/wp-content/uploads/2018/11/cucumber.jpg",
                            category:"vegetables"
                            },
                            {value:"carrots",
                            img: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/18/09/2048x1364/gallery-1519672422-carrots.jpg?resize=480:*",
                            category:"vegetables"
                            },
                            {value:"onions",
                            img: "https://www.thespruceeats.com/thmb/sxx0JHQRPnPV0heagzJFz__zarE=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/onions-2500-5839b12d5f9b58d5b1107a90.jpg",
                            category:"vegetables"
                            },
                            {value:"capsicum",
                            img: "https://1v1d1e1lmiki1lgcvx32p49h8fe-wpengine.netdna-ssl.com/wp-content/uploads/2018/04/1522916196-coloured-capsicums-peppers-.jpg",
                            category:"vegetables"
                            },
                            {value:"celery",
                            img: "https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_1500/https%3A%2F%2Fstorage.googleapis.com%2Fgen-atmedia%2F3%2F2014%2F10%2F1c340c24e50e2a71609db0d2c0d77849b36ba2b4.jpeg",
                            category:"vegetables"
                            }]
                    },
                    "snacks and candy":{
                        "aisle":4,
                        "items":[
                            {value:"chocolate bars",
                            img: "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/confectionerynews.com/article/2019/08/19/new-study-finds-steep-rise-in-sugar-levels-in-uk-chocolate-bars/10055756-1-eng-GB/New-study-finds-steep-rise-in-sugar-levels-in-UK-chocolate-bars_wrbm_large.jpg",
                            category:"snacks and candy"
                            },
                            {value:"potato chips",
                            img: "https://previews.123rf.com/images/kwangmoo/kwangmoo1807/kwangmoo180700317/104709437-crispy-potato-chips-snack-texture-background.jpg",
                            category:"snacks and candy"
                            },
                            {value:"nuts",
                            img: "https://media.npr.org/assets/img/2019/09/27/nuts-1_custom-61cfca772f4f991e157977ffe42febcb8c23d7dc-s800-c85.jpg",
                            category:"snacks and candy"
                            },
                            {value:"gummies",
                            img: "https://tidbitsmag.com/wp-content/uploads/2016/08/20685982-Assortment-of-gummies-on-a-market-stall-Stock-Photo.jpg",
                            category:"snacks and candy"
                            },
                            {value:"seaweed",
                            img: "https://media.npr.org/assets/img/2017/08/31/istock-605786284-34f5b78a564c2a7c6e7bfe5d68a2b830a42e4238-s800-c85.jpg",
                            category:"snacks and candy"
                            }]
                    },
                    "baking needs": {
                        "aisle":5,
                        "items": [
                            {value:"flour",
                            img: "https://img2.exportersindia.com/product_images/bc-full/2019/5/6121355/whole-wheat-flour-1559192789-4929971.jpeg",
                            category:"baking needs"
                            },
                            {value:"baking chocolate",
                            img: "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/02/baking-with-chocolate-5.jpg",
                             category:"baking needs"
                            },
                            {value:"icing",
                            img: "https://www.biggerbolderbaking.com/wp-content/uploads/2018/03/BBB214-Crazy-Frosting-Website-Featured-Image.jpg",
                             category:"baking needs"
                            },
                            {value:"baking soda",
                            img: "https://www.thespruceeats.com/thmb/e8HKZPTx6Q6GxiCHcudw9QrAHC8=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/baking-soda-58ace6af5f9b58a3c9b23ab2.jpg",
                             category:"baking needs"
                            },
                            {value:"pancake mix",
                            img: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/7/11/0/FNK_the-best-pancakes_H_s4x3.jpg.rend.hgtvcom.826.620.suffix/1562853903667.jpeg",
                             category:"baking needs"
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
        container.value = item.value
        container.category = item.category
        container.label = item.value.charAt(0).toUpperCase() + item.value.slice(1)
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
        disabled:false,
        open:false
      };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.groceryList.length !== prevState.groceryList.length) {
      this.props.setGroceryList(this.state.groceryList);
    }
    if (this.state.selectedLocationOption !== null) {
      if (prevState.selectedLocationOption === null) {
        this.props.setMap(this.state.selectedLocationOption.mapType);
      } else if (this.state.selectedLocationOption.mapType.name !== prevState.selectedLocationOption.mapType.name) {
        this.props.setMap(this.state.selectedLocationOption.mapType);
      }
    }
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

    this.setState({disabled: false})
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
    let item = JSON.parse(event.target.value)
    list.push(item)

    this.setState({groceryList:list})

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



    const {classes} = this.props

    return (

      <div style = {{padding:"5%", backgroundColor:"rgba(255,255,255,0.7)"}} >
        <h3 style = {{color:"rgb(156, 39, 176)"}}>Search by Item</h3>
        <Select
          value={selectedItemOption}
          onChange={this.handleItemChange}
          isMulti
          options={itemsObject}
          classNamePrefix="select"
          className = {`${classes.dropdownFont} basic-multi-select`}
        />

      <ResultsItem allData = {singleArrayItems} itemFilter = {this.state.selectedItemOption} list = {this.addToList}/>

      <h3 style = {{color:"rgb(156, 39, 176)"}}>Search by Category</h3>
      <Select
        value={selectedCategoryOption}
        onChange={this.handleCategoryChange}
        options={options}
        className = {classes.dropdownFont}

      />

    <ResultsCategory
      allData={allItems}
      category={this.state.selectedCategoryOption}
      list={this.addToList}
    disabled = {this.state.disabled}
    />
    <Grid container
      style={{borderTop:"1px solid black", marginTop: 10}}
    >

      <Grid item xs={6}>
        <h3 style = {{color:"rgb(156, 39, 176)"}}>Select Store</h3>
        <Select
            value={selectedLayoutOption}
            onChange={this.handleLayoutChange}
            options={stores}
            className = {classes.dropdownFont}
        />
      </Grid>

      <Grid item xs={6}>
        {this.state.selectedLayoutOption !== null? (
          <>
            <h3 style = {{color:"rgb(156, 39, 176)"}}>Select Location</h3>
            <Select
              value={selectedLocationOption}
              onChange={this.handleLocationChange}
              options={this.state.selectedLayoutOption.locations}
              className = {classes.dropdownFont}
            />
          </>
        ): ""}


      </Grid>

        </Grid>
        <br/>
        <Grid container
        justify="center">
            <Badge color = "primary"
            badgeContent={this.state.groceryList.length} style = {{zIndex:"0"}}>
            {this.state.selectedLocationOption !== null? (<Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                      View Grocery List
                    </Button>
                    ): <Button variant="contained" color="secondary" onClick={this.handleClickOpen} disabled>
                      View Grocery List
                    </Button>}

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
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authReducer.authenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGroceryList: list => dispatch(setGroceryList(list)),
    setMap: mapType => dispatch(setMap(mapType)),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Search));
