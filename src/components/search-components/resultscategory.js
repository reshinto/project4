import React from 'react';
import Grid from '@material-ui/core/Grid';
import ImgMediaCardCategory from './cardCategory.js'

export default class ResultsCategory extends React.Component{





    render(){
        let categoryItems;
        let itemItems
        let category;


        if (this.props.category!=null){
            category = this.props.category.value
             let itemImage;

            console.log(category)
            console.log(this.props.allData)

            categoryItems = this.props.allData[category]["items"].map((item,index)=>{
                itemImage = item.img
                return (<div key={index} style = {{marginRight:10, marginTop:10}}>

                <ImgMediaCardCategory item = {item.name} image = {itemImage} onClick = {this.props.list}/>

                    </div>
                )
            })



            }


        return ( <div>
             <Grid container justify = "center">
                    {categoryItems}
            </Grid>
        </div>
        )
    }

}